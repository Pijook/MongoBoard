import React, { useState, useEffect } from 'react';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';
import type { Task, TaskStatus, TaskPriority, TaskType } from '../../api/types';
import { COLUMNS, PRIORITIES } from '../../utils/constants';
import { useTasks } from '../../hooks/useTasks';

const TASK_TYPES: { value: TaskType; label: string }[] = [
  { value: 'NORMAL', label: 'Normal' },
  { value: 'BUG', label: 'Bug' },
  { value: 'FEATURE', label: 'Feature' },
  { value: 'STORY', label: 'Story' },
  { value: 'EPIC', label: 'Epic' },
  { value: 'IMPROVEMENT', label: 'Improvement' },
];

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  task?: Task;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  mode,
  task,
}) => {
  const { addTask, updateTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    taskType: 'NORMAL' as TaskType,
    title: '',
    description: '',
    assignee: '',
    priority: 'Medium' as TaskPriority,
    status: 'TODO' as TaskStatus,
    // Bug fields
    blocker: false,
    // Feature fields
    targetVersion: '',
    effortEstimate: '',
    // Story fields
    storyPoints: null as number | null,
    acceptanceCriteria: '',
    // Epic fields
    childTaskIds: [] as string[],
    // Improvement fields
    affectedArea: '',
  });

  useEffect(() => {
    if (isOpen && mode === 'edit' && task) {
      setFormData({
        taskType: task.taskType,
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        priority: task.priority,
        status: task.status,
        blocker: task.taskType === 'BUG' ? task.blocker : false,
        targetVersion: task.taskType === 'FEATURE' ? task.targetVersion : '',
        effortEstimate: task.taskType === 'FEATURE' ? task.effortEstimate : '',
        storyPoints: task.taskType === 'STORY' ? task.storyPoints : null,
        acceptanceCriteria: task.taskType === 'STORY' ? task.acceptanceCriteria : '',
        childTaskIds: task.taskType === 'EPIC' ? task.childTaskIds : [],
        affectedArea: task.taskType === 'IMPROVEMENT' ? task.affectedArea : '',
      });
    } else if (isOpen && mode === 'create') {
      setFormData({
        taskType: 'NORMAL',
        title: '',
        description: '',
        assignee: '',
        priority: 'Medium',
        status: 'TODO',
        blocker: false,
        targetVersion: '',
        effortEstimate: '',
        storyPoints: null,
        acceptanceCriteria: '',
        childTaskIds: [],
        affectedArea: '',
      });
    }
    setErrors([]);
  }, [isOpen, mode, task]);

  const validate = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.title.trim()) {
      newErrors.push('Title is required');
    } else if (formData.title.length > 100) {
      newErrors.push('Title must be less than 100 characters');
    }

    if (!formData.description.trim()) {
      newErrors.push('Description is required');
    } else if (formData.description.length > 500) {
      newErrors.push('Description must be less than 500 characters');
    }

    if (!formData.assignee.trim()) {
      newErrors.push('Assignee is required');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'create') {
        await addTask(formData);
      } else if (mode === 'edit' && task) {
        await updateTask({
          ...task,
          ...formData,
        });
      }
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
      setErrors(['Failed to save task. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      const numValue = value === '' ? null : parseInt(value, 10);
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Create New Task' : 'Edit Task'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <ul className="list-disc list-inside text-sm text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="taskType" className="block text-sm font-medium text-gray-700 mb-1">
            Task Type
          </label>
          <select
            id="taskType"
            name="taskType"
            value={formData.taskType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {TASK_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length}/500 characters
          </p>
        </div>

        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
            Assignee *
          </label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {COLUMNS.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bug-specific fields */}
        {formData.taskType === 'BUG' && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Bug Details</h4>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="blocker"
                name="blocker"
                checked={formData.blocker}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="blocker" className="ml-2 text-sm text-gray-700">
                Blocker
              </label>
            </div>
          </div>
        )}

        {/* Feature-specific fields */}
        {formData.taskType === 'FEATURE' && (
          <div className="border-t pt-4 space-y-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Feature Details</h4>
            <div>
              <label htmlFor="targetVersion" className="block text-sm font-medium text-gray-700 mb-1">
                Target Version
              </label>
              <input
                type="text"
                id="targetVersion"
                name="targetVersion"
                value={formData.targetVersion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1.0.0"
              />
            </div>
            <div>
              <label htmlFor="effortEstimate" className="block text-sm font-medium text-gray-700 mb-1">
                Effort Estimate
              </label>
              <input
                type="text"
                id="effortEstimate"
                name="effortEstimate"
                value={formData.effortEstimate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2 weeks"
              />
            </div>
          </div>
        )}

        {/* Story-specific fields */}
        {formData.taskType === 'STORY' && (
          <div className="border-t pt-4 space-y-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Story Details</h4>
            <div>
              <label htmlFor="storyPoints" className="block text-sm font-medium text-gray-700 mb-1">
                Story Points
              </label>
              <input
                type="number"
                id="storyPoints"
                name="storyPoints"
                value={formData.storyPoints ?? ''}
                onChange={handleChange}
                min={0}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5"
              />
            </div>
            <div>
              <label htmlFor="acceptanceCriteria" className="block text-sm font-medium text-gray-700 mb-1">
                Acceptance Criteria
              </label>
              <textarea
                id="acceptanceCriteria"
                name="acceptanceCriteria"
                value={formData.acceptanceCriteria}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Define the acceptance criteria..."
              />
            </div>
          </div>
        )}

        {/* Epic-specific fields */}
        {formData.taskType === 'EPIC' && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Epic Details</h4>
            <p className="text-sm text-gray-500">
              Child tasks can be linked after creating the epic.
            </p>
          </div>
        )}

        {/* Improvement-specific fields */}
        {formData.taskType === 'IMPROVEMENT' && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Improvement Details</h4>
            <div>
              <label htmlFor="affectedArea" className="block text-sm font-medium text-gray-700 mb-1">
                Affected Area
              </label>
              <input
                type="text"
                id="affectedArea"
                name="affectedArea"
                value={formData.affectedArea}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Performance, UI, Backend"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose} type="button" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Task' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
