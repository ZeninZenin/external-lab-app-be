import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../config/configuration';
import { MongoClient, MongoError } from 'mongodb';

@Injectable()
export class DbService {
  constructor(private configService: AppConfigService) {}

  async connectToMongoDb(
    dbName = this.configService.get<string>('mongoDbBaseName'),
  ) {
    const mongoDbUser = this.configService.get('mongoDbUser');
    const mongoDbPass = this.configService.get('mongoDbPass');
    const mongoDbClusterUrl = this.configService.get('mongoDbClusterUrl');

    const client = new MongoClient(
      `mongodb+srv://${mongoDbUser}:${mongoDbPass}@${mongoDbClusterUrl}?retryWrites=true&w=majority`,
    );

    await client.connect();
    try {
      return { client, db: client.db(dbName) };
    } catch (error) {
      await client.close();
      throw new MongoError(error);
    }
  }
}
