import type { TaskStatus, TaskPriority } from '../api/types';

export const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'TODO', title: 'TODO' },
  { id: 'In progress', title: 'In Progress' },
  { id: 'Done', title: 'Done' },
];

export const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High', 'Critical'];

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  Low: 'bg-blue-100 text-blue-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-orange-100 text-orange-800',
  Critical: 'bg-red-100 text-red-800',
};
