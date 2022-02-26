import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './users.types';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { ScoresService } from '../scores/scores.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
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

  verifyUser = async ({ login, roles }: User) => {
    const user = await this.userModel.findOneAndUpdate({ login }, { roles });

    if (roles.includes('student')) {
      await this.scoresService.initScoresForStudent(
        user._id,
        user.trainerId?._id,
      );
    }

    return user;
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
