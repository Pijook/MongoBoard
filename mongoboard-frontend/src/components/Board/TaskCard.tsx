import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Trash2, Bug, Sparkles, BookOpen, Layers, Wrench, FileText } from 'lucide-react';
import type { Task, TaskType } from '../../api/types';
import { PRIORITY_COLORS } from '../../utils/constants';
import { formatTaskDate } from '../../utils/dateHelpers';
import { useTasks } from '../../hooks/useTasks';
import { TaskModal } from '../TaskModal/TaskModal';

const TASK_TYPE_CONFIG: Record<TaskType, { icon: React.ElementType; color: string; label: string }> = {
  NORMAL: { icon: FileText, color: 'bg-gray-100 text-gray-700', label: 'Task' },
  BUG: { icon: Bug, color: 'bg-red-100 text-red-700', label: 'Bug' },
  FEATURE: { icon: Sparkles, color: 'bg-purple-100 text-purple-700', label: 'Feature' },
  STORY: { icon: BookOpen, color: 'bg-blue-100 text-blue-700', label: 'Story' },
  EPIC: { icon: Layers, color: 'bg-orange-100 text-orange-700', label: 'Epic' },
  IMPROVEMENT: { icon: Wrench, color: 'bg-green-100 text-green-700', label: 'Improvement' },
};

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id!,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      setIsDeleting(true);
      try {
        await deleteTask(task.id!);
      } catch (error) {
        console.error('Failed to delete task:', error);
        setIsDeleting(false);
      }
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const typeConfig = TASK_TYPE_CONFIG[task.taskType];
  const TypeIcon = typeConfig.icon;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="task-card relative"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${typeConfig.color}`}>
              <TypeIcon size={12} />
              {typeConfig.label}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-600 transition-colors p-1 disabled:opacity-50"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {task.taskType === 'BUG' && task.blocker && (
          <div className="mb-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded inline-block">
            BLOCKER
          </div>
        )}

        <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>

        <p className="text-sm text-gray-600 mb-3">
          {truncateText(task.description, 80)}
        </p>

        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <div>
            <span className="font-medium">Assignee:</span> {task.assignee}
          </div>
          <div>
            <span className="font-medium">Created:</span> {formatTaskDate(task.createdAt)}
          </div>
          {task.taskType === 'STORY' && task.storyPoints !== null && (
            <div>
              <span className="font-medium">Story Points:</span> {task.storyPoints}
            </div>
          )}
          {task.taskType === 'FEATURE' && task.targetVersion && (
            <div>
              <span className="font-medium">Target:</span> {task.targetVersion}
            </div>
          )}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={task}
      />
    </>
  );
};
