import { User } from './user.schema';

export type CreateUserDto = Partial<Omit<User, 'isLocked'>>;

export type UpdateUserDto = Partial<
  Omit<User, 'isLocked' | 'githubName' | 'login'>
>;

export type UpdateUserNameDto = Pick<User, 'firstName' | 'lastName'>;
