import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../auth';

export type UserDocument = User & Document;

@Schema()
export class User {
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

  @Prop()
  trainerId: string;

  @Prop({ type: [String], default: ['guest'] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
