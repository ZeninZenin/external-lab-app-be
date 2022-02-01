import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [ConfigService, Logger, TasksService],
})
export class TasksModule {}
