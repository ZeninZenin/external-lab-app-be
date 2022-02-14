import { Controller, Get, HttpException, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly logger: Logger,
    private readonly tasksService: TasksService,
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
