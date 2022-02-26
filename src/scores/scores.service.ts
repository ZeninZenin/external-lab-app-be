import { HttpException, Injectable } from '@nestjs/common';
import { CreateScoreDto, InitScoreDto } from './scores.types';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Score } from './scores.schemas';
import { User } from '../users/user.schema';
import { Task } from '../tasks/task.schema';

@Injectable()
export class ScoresService {
  constructor(
    @InjectModel(Score.name) private scoreModel: Model<Score>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  initScoresForStudent = async (
    studentId: Types.ObjectId,
    trainerId: Types.ObjectId,
  ) => {
    const tasks = await this.taskModel.find();

    return this.scoreModel.insertMany(
      tasks.map<InitScoreDto>(({ _id, deadline }) => ({
        student: studentId,
        trainerId,
        task: _id,
        deadlineDate: deadline,
        status: 'todo',
      })),
    );
  };

  create = async (record: CreateScoreDto) => {
    const task = await this.taskModel.findOne({ name: record.task });

    if (!task) {
      throw new HttpException(
        `There is no the task with name "${record.task}"`,
        404,
      );
    }

    const newItem = new this.scoreModel({
      ...record,
      status: 'todo',
      deadlineDate: task.deadline,
    });

    return newItem.save();
  };

  findAll = async (scoreFilter: FilterQuery<Score> = {}) => {
    return this.scoreModel.find().populate('task').find(scoreFilter).exec();
  };

  sendForReview = async (
    studentId: string,
    taskId: string,
    pullRequestLink: string,
  ) => {
    const score = await this.scoreModel.findOne({
      student: studentId,
      task: taskId,
    });

    if (!['todo', 'onRevision'].includes(score.get('status'))) {
      throw new HttpException(
        'It`s possible to send task for Review only for tasks with status "todo" or "onRevision"',
        400,
      );
    }

    if (!score.get('submissionDate')) {
      score.set('submissionDate', new Date());
    }

    return score
      .set('status', 'onReview')
      .set('pullRequestLink', pullRequestLink)
      .save();
  };

  updatePullRequestLink = async (
    studentId: string,
    taskId: string,
    pullRequestLink: string,
  ) => {
    return this.scoreModel
      .findOneAndUpdate({
        student: studentId,
        task: taskId,
      })
      .set('pullRequestLink', pullRequestLink);
  };

  sendForRevision = async (studentId: string, taskId: string) => {
    const score = await this.scoreModel.findOne({
      student: studentId,
      task: taskId,
    });

    if (score.get('status') !== 'onReview') {
      throw new HttpException(
        'It`s allowed to send task for revision only for tasks with status "onReview"',
        400,
      );
    }

    if (!!score.get('sendingForRevisionDate')) {
      throw new HttpException(
        'It`s allowed to send task for revision only once',
        400,
      );
    }

    score.set('status', 'onRevision');

    return score.save();
  };

  complete = async (_id) => {
    return this.scoreModel
      .findOneAndUpdate({ _id })
      .set('status', 'done')
      .set('completionDate', new Date());
  };

  // update = async (studentLogin: string, updateScoreDto: UpdateScoreDto) => {
  //   return this.scoreModel.findOneAndUpdate({ studentLogin }, updateScoreDto);
  // };

  // sendTaskOnReview = async (studentLogin: string, taskName: string) => {
  //   const score = await this.scoreModel.findOne({ studentLogin });
  //   const
  //   const scoreModel = new this.scoreModel(score);
  //   scoreModel.update({$set: {''}})
  // };
}
