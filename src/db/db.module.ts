import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { AppConfigService } from '../../config/configuration';

@Module({
  providers: [AppConfigService, DbService],
  exports: [DbService],
})
export class DbModule {}
