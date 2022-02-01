import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { TaskDB } from './tasks.types';

@Injectable()
export class TasksService {
  constructor(private configService: ConfigService) {}

  async findAll() {
    const { data } = await axios.post<{ documents: TaskDB[] }>(
      `${this.configService.get('databaseHost')}/find`,
      { collection: 'Tasks', database: 'Externals', dataSource: 'Cluster0' },
      {
        headers: { 'api-key': this.configService.get('databaseApiKey') },
      },
    );

    return data.documents.map(({ _id, ...task }) => ({
      ...task,
      id: _id,
    }));
  }
}
