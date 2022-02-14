import { Logger, Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DbModule } from '../db';
import { AppConfigService } from '../../config/configuration';

@Module({
  exports: [TasksService],
  controllers: [TasksController],
  providers: [AppConfigService, Logger, TasksService],
  imports: [DbModule],
})
export class TasksModule {}
