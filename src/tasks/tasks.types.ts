export interface TaskDB {
  _id: string;
  name: string;
}

export interface Task extends Omit<TaskDB, '_id'> {
  id: string;
}
