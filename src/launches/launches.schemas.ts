import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongodb';

@Schema()
export class Launch extends Document {
  @Prop()
  isActual: boolean;

  @Prop()
  name: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;
}

export const LaunchSchema = SchemaFactory.createForClass(Launch);
