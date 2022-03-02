import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  Req,
  HttpException,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { FilterQuery } from 'mongoose';
import { Score } from './scores.schemas';
import { User } from '../users/user.schema';
import { Roles } from '../auth';
import { Request } from 'express';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  // @Post()
  // create(@Body() createScoreDto: CreateScoreDto) {
  //   return this.scoresService.create(createScoreDto);
  // }

  @Get()
  @Roles('admin', 'trainer')
  findAll(@Query('scoreFilter') scoreFilter?: FilterQuery<Score>) {
    return this.scoresService.findAll(scoreFilter);
  }

  @Post('/dashboard')
  @Roles('admin', 'trainer')
  findScoresByTrainer(
    @Body('trainers') trainers: string,
    @Body('statuses') statuses?: string,
  ) {
    return this.scoresService.findAllWithUsers({
      trainer: trainers,
      status: statuses,
    });
  }

  @Put('send-for-review')
  @Roles('admin', 'trainer', 'student')
  sendForReview(
    @Body('studentId') studentId: string,
    @Body('taskId') taskId: string,
    @Body('pullRequestLink') pullRequestLink: string,
    @Req() { user }: Request & { user: User },
  ) {
    if (!pullRequestLink) {
      throw new HttpException('pullRequestLink is required', 400);
    }

    if (user?.roles?.includes('student') && user._id !== studentId) {
      throw new HttpException(
        'You may not to update another student`s score',
        403,
      );
    }

    return this.scoresService.sendForReview(studentId, taskId, pullRequestLink);
  }

  @Put('update-pull-request-link')
  @Roles('admin', 'trainer', 'student')
  updatePullRequestLink(
    @Body('studentId') studentId: string,
    @Body('taskId') taskId: string,
    @Body('pullRequestLink') pullRequestLink: string,
    @Req() { user }: Request & { user: User },
  ) {
    if (!pullRequestLink) {
      throw new HttpException('pullRequestLink is required', 400);
    }

    if (user?.roles?.includes('student') && user._id !== studentId) {
      throw new HttpException(
        'You may not to update another student`s score',
        403,
      );
    }

    return this.scoresService.updatePullRequestLink(
      studentId,
      taskId,
      pullRequestLink,
    );
  }

  @Put('send-for-revision')
  @Roles('admin', 'trainer', 'student')
  sendForRevision(
    @Body('studentId') studentId: string,
    @Body('taskId') taskId: string,
    @Req() { user }: Request & { user: User },
  ) {
    if (user?.roles?.includes('student') && user._id !== studentId) {
      throw new HttpException(
        'You may not to update another student`s score',
        403,
      );
    }

    return this.scoresService.sendForRevision(studentId, taskId);
  }

  @Put('revision-done')
  @Roles('admin', 'trainer', 'student')
  revisionDone(
    @Body('studentId') studentId: string,
    @Body('taskId') taskId: string,
    @Req() { user }: Request & { user: User },
  ) {
    if (user?.roles?.includes('student') && user._id !== studentId) {
      throw new HttpException(
        'You may not to update another student`s score',
        403,
      );
    }

    return this.scoresService.revisionDone(studentId, taskId);
  }

  @Put('complete')
  @Roles('admin', 'trainer')
  complete(
    @Body('id') id: string,
    @Body('score') score: number,
    @Body('comment') comment: string,
  ) {
    return this.scoresService.complete(id, score, comment);
  }

  @Put('updateDeadline')
  @Roles('admin', 'trainer')
  updateDeadline(
    @Body('id') id: string,
    @Body('deadlineDate') deadlineDate: string,
    @Body('deadlineChangeComment') deadlineChangeComment: string,
  ) {
    return this.scoresService.updateDeadline(
      id,
      deadlineDate,
      deadlineChangeComment,
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.scoresService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
  //   return this.scoresService.update(+id, updateScoreDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.scoresService.remove(+id);
  // }
}
