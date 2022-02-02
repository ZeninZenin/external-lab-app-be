import { Controller, Get, HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private configService: ConfigService,
    private logger: Logger,
    private tasksService: TasksService,
  ) {}

  @Get()
  async findAll() {
    try {
      return await this.tasksService.findAll();
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.message, err.response.status);
    }
  }
}
