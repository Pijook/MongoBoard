import React, { useState, useEffect } from 'react';
import { BarChart3, CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';
import type { TaskStatistics } from '../api/types';
import { taskApi } from '../api/taskApi';

export const Statistics: React.FC = () => {
  const [stats, setStats] = useState<TaskStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const data = await taskApi.getStatistics();
      setStats(data);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="animate-pulse flex items-center gap-4">
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const priorityColors: Record<string, string> = {
    'Low': 'bg-gray-100 text-gray-700',
    'Medium': 'bg-blue-100 text-blue-700',
    'High': 'bg-orange-100 text-orange-700',
    'Critical': 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Summary Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={20} />
            <span className="font-semibold text-gray-900">Total Tasks:</span>
            <span className="text-2xl font-bold text-blue-600">{stats.totalTasks}</span>
          </div>

          {/* Quick Status Summary */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="text-yellow-600" size={16} />
              <span className="text-sm text-gray-600">To Do:</span>
              <span className="font-medium">{stats.byStatus['TODO'] || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle className="text-blue-600" size={16} />
              <span className="text-sm text-gray-600">In Progress:</span>
              <span className="font-medium">{stats.byStatus['In progress'] || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="text-green-600" size={16} />
              <span className="text-sm text-gray-600">Done:</span>
              <span className="font-medium">{stats.byStatus['Done'] || 0}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* By Priority */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">By Priority</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byPriority).map(([priority, count]) => (
                <span
                  key={priority}
                  className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[priority] || 'bg-gray-100 text-gray-700'}`}
                >
                  {priority}: {count}
                </span>
              ))}
            </div>
          </div>

          {/* By Type */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">By Type</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byTaskType).map(([type, count]) => (
                <span
                  key={type}
                  className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700"
                >
                  {type}: {count}
                </span>
              ))}
            </div>
          </div>

          {/* By Assignee */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Users size={14} />
              By Assignee
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byAssignee).map(([assignee, count]) => (
                <span
                  key={assignee}
                  className="px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-700"
                >
                  {assignee}: {count}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
