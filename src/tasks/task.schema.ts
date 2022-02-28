import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  deadline: Date;

  @Prop()
  isOptional: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
