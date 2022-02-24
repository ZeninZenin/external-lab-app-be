import { Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from './users.types';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create = async (record: CreateUserDto) => {
    const newUser = new this.userModel(record);

    return newUser.save();
  };

  findOneOrCreate = async (record: CreateUserDto) => {
    const result = await this.userModel.findOne({ login: record.login });

    return result || this.create(record);
  };

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  find = async (usersFilterQuery?: FilterQuery<User>): Promise<User[]> => {
    return this.userModel.find(usersFilterQuery);
  };

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    userDto: UpdateUserDto,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, userDto, {
      new: true,
    });
  }

  verifyUser = async ({ login, roles }: User) => {
    return this.userModel.findOneAndUpdate({ login }, { roles });
  };

  lockUser = async (login: string) => {
    return this.userModel.findOneAndUpdate({ login }, { isLocked: true });
  };

  unlockUser = async (login: string) => {
    return this.userModel.findOneAndUpdate({ login }, { isLocked: false });
  };
}
