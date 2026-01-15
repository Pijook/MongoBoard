import axios from 'axios';
import type { Task, CreateTaskDto } from './types';

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

  addTask: async (task: CreateTaskDto): Promise<Task> => {
    const taskWithDates = {
      ...task,
      id: null,
      createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      updatedAt: new Date().toISOString().split('T')[0],
      errors: []
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
