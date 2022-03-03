import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Roles } from '../auth';
import { CreateTaskDto, UpdateTaskDto } from './tasks.types';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll() {
    return this.tasksService.find();
  }

  @Post()
  @Roles('admin')
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get(':id')
  @Roles('admin', 'trainer')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne({ _id: id });
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.tasksService.findOneAndUpdate(
      { _id: id },
      {
        ...body,
      },
    );
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
