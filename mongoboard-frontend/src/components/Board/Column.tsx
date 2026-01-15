import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { Task, TaskStatus } from '../../api/types';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const columnColors = {
    'TODO': 'bg-gray-100 border-gray-300',
    'In progress': 'bg-blue-50 border-blue-300',
    'Done': 'bg-green-50 border-green-300',
  };

  return (
    <div
      ref={setNodeRef}
      className={`column border-2 transition-colors ${columnColors[id]} ${
        isOver ? 'bg-blue-100 border-blue-400' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3 min-h-[400px]">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            <p>No tasks</p>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};
