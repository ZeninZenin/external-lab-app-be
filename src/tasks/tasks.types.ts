import { Task } from './task.schema';

export type CreateTaskDto = Task;

export type UpdateTaskDto = Partial<CreateTaskDto>;
