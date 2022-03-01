import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { TaskStatus } from './scores.types';
import { User } from '../users/user.schema';
import { Task } from '../tasks/task.schema';

@Schema()
export class Score extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: () => User,
  })
  student: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: () => User,
  })
  trainer: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: () => Task })
  task: Types.ObjectId;

  @Prop()
  status: TaskStatus;

  @Prop()
  deadlineDate: Date;

  @Prop()
  score?: number;

  @Prop()
  comment?: string;

  @Prop()
  deadlineChangeComment?: string;

  @Prop()
  submissionDate?: Date;

  @Prop()
  sendingForRevisionDate?: Date;

  @Prop()
  revisionDoneDate?: Date;

  @Prop()
  completionDate?: Date;

  @Prop()
  pullRequestLink?: string;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
