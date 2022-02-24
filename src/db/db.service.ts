import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../config/configuration.service';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class DbService implements MongooseOptionsFactory {
  constructor(private configService: AppConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const dbName = this.configService.get<string>('mongoDbBaseName');
    const mongoDbUser = this.configService.get('mongoDbUser');
    const mongoDbPass = this.configService.get('mongoDbPass');
    const mongoDbClusterUrl = this.configService.get('mongoDbClusterUrl');

    console.log(`\n Connecting to DB ${dbName} ... \n`);

    const uri = `mongodb+srv://${mongoDbUser}:${mongoDbPass}@${mongoDbClusterUrl}/${dbName}?retryWrites=true&w=majority`;

    return {
      uri,
    };
  }
}
