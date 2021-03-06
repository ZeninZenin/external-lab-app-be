import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Task } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './tasks.types';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

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

  delete = async (_id: string) => {
    return this.taskModel.deleteOne({ _id });
  };
}
