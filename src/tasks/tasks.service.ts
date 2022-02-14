import { Injectable, Logger } from '@nestjs/common';
import { TaskDocument } from './tasks.types';
import { AppConfigService } from '../../config/configuration';
import { DbService } from '../db/db.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly configService: AppConfigService,
    private readonly logger: Logger,
    private readonly dbService: DbService,
  ) {}

  async findAll() {
    const { db, client } = await this.dbService.connectToMongoDb();
    const tasks = await db.collection<TaskDocument>('Tasks').find().toArray();
    await client.close();

    return tasks.map(({ _id, ...task }) => ({
      ...task,
      id: _id,
    }));
  }
}
