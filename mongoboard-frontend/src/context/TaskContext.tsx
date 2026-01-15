import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Task, CreateTaskDto } from '../api/types';
import { taskApi } from '../api/taskApi';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: CreateTaskDto) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: CreateTaskDto) => {
    setLoading(true);
    setError(null);
    try {
      await taskApi.addTask(task);
      await refreshTasks();
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (task: Task) => {
    setLoading(true);
    setError(null);
    try {
      await taskApi.updateTask(task);
      await refreshTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await taskApi.deleteTask(id);
      await refreshTasks();
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const value: TaskContextType = {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refreshTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
