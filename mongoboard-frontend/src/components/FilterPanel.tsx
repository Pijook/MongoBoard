import React from 'react';
import { Search, X } from 'lucide-react';
import type { TaskFilter, TaskType, TaskStatus, TaskPriority } from '../api/types';

const TASK_TYPES: { value: TaskType | ''; label: string }[] = [
  { value: '', label: 'All Types' },
  { value: 'NORMAL', label: 'Normal' },
  { value: 'BUG', label: 'Bug' },
  { value: 'FEATURE', label: 'Feature' },
  { value: 'STORY', label: 'Story' },
  { value: 'EPIC', label: 'Epic' },
  { value: 'IMPROVEMENT', label: 'Improvement' },
];

const STATUSES: { value: TaskStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'TODO', label: 'To Do' },
  { value: 'In progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
];

const PRIORITIES: { value: TaskPriority | ''; label: string }[] = [
  { value: '', label: 'All Priorities' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Critical', label: 'Critical' },
];

interface FilterPanelProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onClearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filter,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters = Object.values(filter).some((v) => v !== undefined && v !== '');

  const handleChange = (key: keyof TaskFilter, value: string) => {
    onFilterChange({
      ...filter,
      [key]: value || undefined,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Task Type */}
        <select
          value={filter.taskType || ''}
          onChange={(e) => handleChange('taskType', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {TASK_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filter.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        {/* Priority */}
        <select
          value={filter.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {PRIORITIES.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>

        {/* Assignee */}
        <input
          type="text"
          placeholder="Assignee..."
          value={filter.assignee || ''}
          onChange={(e) => handleChange('assignee', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px]"
        />

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filter.dateFrom || ''}
            onChange={(e) => handleChange('dateFrom', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={filter.dateTo || ''}
            onChange={(e) => handleChange('dateTo', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <X size={18} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
