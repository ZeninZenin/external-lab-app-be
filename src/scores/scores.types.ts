import { Score } from './scores.schemas';

export type TaskStatus = 'todo' | 'onReview' | 'onRevision' | 'done';

export type CreateScoreDto = Pick<Score, 'student' | 'task'>;

export type UpdateScoreDto = Partial<Omit<Score, 'studentLogin' | 'task'>>;
