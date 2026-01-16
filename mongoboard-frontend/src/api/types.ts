export type TaskType = 'NORMAL' | 'BUG' | 'FEATURE' | 'STORY' | 'EPIC' | 'IMPROVEMENT';

export type TaskStatus = 'TODO' | 'In progress' | 'Done';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

// Base task interface
export interface BaseTask {
  id: string | null;
  taskType: TaskType;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
  errors?: string[];
}

// Normal task (no extra fields)
export interface NormalTask extends BaseTask {
  taskType: 'NORMAL';
}

// Bug task
export interface BugTask extends BaseTask {
  taskType: 'BUG';
  blocker: boolean;
}

// Feature task
export interface FeatureTask extends BaseTask {
  taskType: 'FEATURE';
  targetVersion: string;
  effortEstimate: string;
}

// Story task
export interface StoryTask extends BaseTask {
  taskType: 'STORY';
  storyPoints: number | null;
  acceptanceCriteria: string;
}

// Epic task
export interface EpicTask extends BaseTask {
  taskType: 'EPIC';
  childTaskIds: string[];
}

// Improvement task
export interface ImprovementTask extends BaseTask {
  taskType: 'IMPROVEMENT';
  affectedArea: string;
}

// Union type for all tasks
export type Task = NormalTask | BugTask | FeatureTask | StoryTask | EpicTask | ImprovementTask;

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export interface CreateTaskDto {
  taskType: TaskType;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
  priority: TaskPriority;
  // Optional fields based on task type
  blocker?: boolean;
  targetVersion?: string;
  effortEstimate?: string;
  storyPoints?: number | null;
  acceptanceCriteria?: string;
  childTaskIds?: string[];
  affectedArea?: string;
}
