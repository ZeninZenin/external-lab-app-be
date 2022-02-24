import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  deadline: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
