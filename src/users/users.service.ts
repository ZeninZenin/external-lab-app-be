import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './users.types';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { ScoresService } from '../scores/scores.service';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private readonly scoresService: ScoresService,
  ) {}

  create = async (record: CreateUserDto) => {
    const newUser = new this.userModel(record);

    return newUser.save();
  };

  findOneOrCreate = async (record: CreateUserDto) => {
    const result = await this.userModel.findOne({ login: record.login });

    return result || this.create(record);
  };

  findOne = async (userFilterQuery: FilterQuery<User>): Promise<User> => {
    return this.userModel.findOne(userFilterQuery);
  };

  find = async (usersFilterQuery?: FilterQuery<User>): Promise<User[]> => {
    return this.userModel.find(usersFilterQuery);
  };

  findOneAndUpdate = async (
    userFilterQuery: FilterQuery<User>,
    userDto: UpdateUserDto,
  ): Promise<User> => {
    return this.userModel.findOneAndUpdate(userFilterQuery, userDto, {
      new: true,
    });
  };

  verifyUser = async ({ login, roles, trainer }: User) => {
    if (roles.includes('student')) {
      const user = await this.userModel.findOneAndUpdate(
        { login },
        { trainer: trainer, roles },
        { new: true },
      );

      await this.scoresService.initScoresForStudent(user._id, trainer);

      return user;
    }

    return null;
  };

  lockUser = async (login: string) => {
    return this.userModel.findOneAndUpdate({ login }, { isLocked: true });
  };

  unlockUser = async (login: string) => {
    return this.userModel.findOneAndUpdate({ login }, { isLocked: false });
  };

  getStudentScores = async (login: string) => {
    const student = await this.userModel.findOne({ login });
    return await this.scoresService.findAll({ student: student?._id });
  };
}
