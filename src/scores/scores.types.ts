import { Score } from './scores.schemas';

export type TaskStatus = 'todo' | 'onReview' | 'onRevision' | 'done';

export type CreateScoreDto = Pick<Score, 'student' | 'task' | 'trainer'>;

export type InitScoreDto = Pick<
  Score,
  'student' | 'task' | 'trainer' | 'deadlineDate' | 'status'
>;

export type UpdateScoreDto = Partial<Omit<Score, 'studentLogin' | 'task'>>;
