import axios from 'axios';
import type { Task, CreateTaskDto, TaskFilter, TaskStatistics } from './types';

const API_BASE_URL = '/api/tasks';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axiosInstance.get<Task[]>('/all');
    return response.data;
  },

  filterTasks: async (filter: TaskFilter): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filter.taskType) params.append('taskType', filter.taskType);
    if (filter.status) params.append('status', filter.status);
    if (filter.priority) params.append('priority', filter.priority);
    if (filter.assignee) params.append('assignee', filter.assignee);
    if (filter.search) params.append('search', filter.search);
    if (filter.dateFrom) params.append('dateFrom', filter.dateFrom);
    if (filter.dateTo) params.append('dateTo', filter.dateTo);

    const response = await axiosInstance.get<Task[]>(`/filter?${params.toString()}`);
    return response.data;
  },

  getStatistics: async (): Promise<TaskStatistics> => {
    const response = await axiosInstance.get<TaskStatistics>('/stats');
    return response.data;
  },

  addTask: async (task: CreateTaskDto): Promise<Task> => {
    const now = new Date().toISOString().split('T')[0];
    const taskWithDates = {
      taskType: task.taskType,
      id: null,
      title: task.title,
      description: task.description,
      status: task.status,
      assignee: task.assignee,
      priority: task.priority,
      createdAt: now,
      updatedAt: now,
      errors: [],
      // Include type-specific fields based on taskType
      ...(task.taskType === 'BUG' && { blocker: task.blocker ?? false }),
      ...(task.taskType === 'FEATURE' && {
        targetVersion: task.targetVersion ?? '',
        effortEstimate: task.effortEstimate ?? '',
      }),
      ...(task.taskType === 'STORY' && {
        storyPoints: task.storyPoints ?? null,
        acceptanceCriteria: task.acceptanceCriteria ?? '',
      }),
      ...(task.taskType === 'EPIC' && {
        childTaskIds: task.childTaskIds ?? [],
      }),
      ...(task.taskType === 'IMPROVEMENT' && {
        affectedArea: task.affectedArea ?? '',
      }),
    };
    const response = await axiosInstance.post<Task>('/add', taskWithDates);
    return response.data;
  },

  updateTask: async (task: Task): Promise<Task> => {
    const taskWithUpdatedDate = {
      ...task,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    const response = await axiosInstance.put<Task>('/update', taskWithUpdatedDate);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/delete/${id}`);
  },
};
