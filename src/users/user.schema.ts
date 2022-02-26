import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Role } from '../auth';

@Schema()
export class User extends Document {
  @Prop()
  login: string;

  @Prop({ default: false })
  isLocked: boolean;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  githubName: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: () => User })
  trainer: Types.ObjectId;

  @Prop({ type: [String], default: ['guest'] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
