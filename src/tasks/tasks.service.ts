import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './tasks.types';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create = async (record: CreateTaskDto) => {
    const newItem = new this.taskModel(record);

    return newItem.save();
  };

  findOne = async (filterQuery: FilterQuery<Task>): Promise<Task> => {
    return this.taskModel.findOne(filterQuery);
  };

  find = async (usersFilterQuery?: FilterQuery<Task>): Promise<Task[]> => {
    return this.taskModel.find(usersFilterQuery);
  };

  findOneAndUpdate = async (
    filterQuery: FilterQuery<Task>,
    userDto: UpdateTaskDto,
  ): Promise<Task> => {
    return this.taskModel.findOneAndUpdate(filterQuery, userDto, {
      new: true,
    });
  };
}
