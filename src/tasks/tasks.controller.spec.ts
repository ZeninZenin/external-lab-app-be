import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AppConfigService } from '../../config/configuration.service';
import { DbModule } from '../db';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [Logger, TasksService, AppConfigService],
      imports: [DbModule],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
