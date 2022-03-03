import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Lecture extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  isPractice: boolean;

  @Prop()
  date: Date;
}

export const LectureSchema = SchemaFactory.createForClass(Lecture);
