import { Role } from '../auth';

export interface UserDocument {
  login: string;
  roles?: Role[];
  isLocked: boolean;
  githubName: string;
  firstName?: string;
  surName?: string;
}

export type User = Omit<UserDocument, '_id' | 'isLocked'>;

export type CreateUserDto = Omit<UserDocument, 'isLocked'>;
export type UpdateUserDto = Omit<
  UserDocument,
  '_id' | 'isLocked' | 'githubName' | 'login'
>;
