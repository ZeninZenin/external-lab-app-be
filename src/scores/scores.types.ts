import { Score } from './scores.schemas';

export type TaskStatus = 'todo' | 'onReview' | 'onRevision' | 'done';

export type CreateScoreDto = Pick<Score, 'student' | 'task' | 'trainerId'>;

export type InitScoreDto = Pick<
  Score,
  'student' | 'task' | 'trainerId' | 'deadlineDate' | 'status'
>;

export type UpdateScoreDto = Partial<Omit<Score, 'studentLogin' | 'task'>>;
