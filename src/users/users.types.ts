export interface UserDocument {
  login: string;
  roles?: ('admin' | 'trainer' | 'student')[];
  isLocked: boolean;
  isVerified: boolean;
  githubName: string;
  firstName?: string;
  surName?: string;
}

export type User = Omit<UserDocument, '_id' | 'isLocked'>;

export type CreateUserDto = Omit<UserDocument, 'isLocked' | 'isVerified'>;
export type UpdateUserDto = Omit<
  UserDocument,
  '_id' | 'isLocked' | 'isVerified' | 'githubName' | 'login'
>;
