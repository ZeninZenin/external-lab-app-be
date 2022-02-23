import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'Users' })
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
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
