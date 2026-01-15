export interface Task {
  id: string | null;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
  priority: TaskPriority;
  createdAt: string; // ISO date string (YYYY-MM-DD)
  updatedAt: string; // ISO date string (YYYY-MM-DD)
  errors?: string[];
}

export type TaskStatus = 'TODO' | 'In progress' | 'Done';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
  priority: TaskPriority;
}
