import React from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useTasks } from '../../hooks/useTasks';
import { COLUMNS } from '../../utils/constants';
import { Column } from './Column';
import type { TaskStatus } from '../../api/types';
import { LoadingSpinner } from '../UI/LoadingSpinner';

export const Board: React.FC = () => {
  const { tasks, loading, error, updateTask } = useTasks();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 8px movement before drag starts
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // 200ms press before drag starts
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      try {
        await updateTask({ ...task, status: newStatus });
      } catch (error) {
        console.error('Failed to update task status:', error);
      }
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-gray-600 text-sm mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const groupTasksByStatus = () => {
    return COLUMNS.map((column) => ({
      ...column,
      tasks: tasks.filter((task) => task.status === column.id),
    }));
  };

  const columns = groupTasksByStatus();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};
