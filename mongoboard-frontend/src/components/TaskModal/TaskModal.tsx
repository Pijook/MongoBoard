import React, { useState } from 'react';
import { Edit, Trash2, Calendar, User, Flag } from 'lucide-react';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import type { Task } from '../../api/types';
import { PRIORITY_COLORS } from '../../utils/constants';
import { formatTaskDate } from '../../utils/dateHelpers';
import { useTasks } from '../../hooks/useTasks';
import { TaskForm } from './TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
  const { deleteTask } = useTasks();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      setIsDeleting(true);
      try {
        await deleteTask(task.id!);
        onClose();
      } catch (error) {
        console.error('Failed to delete task:', error);
        setIsDeleting(false);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Task Details">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{task.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${PRIORITY_COLORS[task.priority]}`}>
                {task.priority}
              </span>
            </div>
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {task.status}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <User size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Assignee</p>
                <p className="font-medium">{task.assignee}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Flag size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Priority</p>
                <p className="font-medium">{task.priority}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Created</p>
                <p className="font-medium">{formatTaskDate(task.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Updated</p>
                <p className="font-medium">{formatTaskDate(task.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              <Trash2 size={18} />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
            <Button
              onClick={handleEditClick}
              className="flex items-center gap-2"
            >
              <Edit size={18} />
              Edit
            </Button>
          </div>
        </div>
      </Modal>

      <TaskForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mode="edit"
        task={task}
      />
    </>
  );
};
