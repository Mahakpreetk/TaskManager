export type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'all';
export type TaskPriority = 'high' | 'low' | 'medium';

export interface Task {
  assigned_to: string,
  priority: TaskPriority,
  status: TaskStatus,
  due_date: Date,
  title: string,
  description: string,
  createdAt?: Date,
  udpatedAt?: Date,
}