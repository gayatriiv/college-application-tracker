import React from 'react';
import { Calendar, MapPin, Edit, Trash2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Application } from '../../types';

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  'not-started': { color: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200', icon: Clock },
  'in-progress': { color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300', icon: Clock },
  'submitted': { color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300', icon: CheckCircle },
  'accepted': { color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300', icon: CheckCircle },
  'rejected': { color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300', icon: AlertTriangle }
};

const priorityConfig = {
  low: 'border-green-200 dark:border-green-700/50 shadow-green-500/10',
  medium: 'border-orange-200 dark:border-orange-700/50 shadow-orange-500/10',
  high: 'border-red-200 dark:border-red-700/50 shadow-red-500/10'
};

export function ApplicationCard({ application, onEdit, onDelete }: ApplicationCardProps) {
  const statusInfo = statusConfig[application.status];
  const StatusIcon = statusInfo.icon;
  
  const getDaysUntil = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntil(application.deadline);
  const isOverdue = daysUntil < 0;
  const isUrgent = daysUntil <= 3 && daysUntil >= 0;

  const completedTasks = application.checklist.filter(item => item.completed).length;
  const totalTasks = application.checklist.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${application.name}"?`)) {
      onDelete(application.id);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border-2 p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${priorityConfig[application.priority]} backdrop-blur-sm`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{application.name}</h3>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              application.type === 'college' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
            }`}>
              {application.type}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
            <Calendar className="w-4 h-4" />
            <span>Due: {new Date(application.deadline).toLocaleDateString()}</span>
            {isOverdue && <span className="text-red-600 dark:text-red-400 font-medium">(Overdue)</span>}
            {isUrgent && <span className="text-orange-600 dark:text-orange-400 font-medium">(Urgent)</span>}
          </div>

          {application.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{application.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(application)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 hover:scale-110"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 hover:scale-110"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <StatusIcon className={`w-4 h-4 ${
          statusInfo.color.includes('gray') ? 'text-gray-600 dark:text-gray-400' : 
          statusInfo.color.includes('orange') ? 'text-orange-600 dark:text-orange-400' : 
          statusInfo.color.includes('blue') ? 'text-blue-600 dark:text-blue-400' : 
          statusInfo.color.includes('green') ? 'text-green-600 dark:text-green-400' : 
          'text-red-600 dark:text-red-400'
        }`} />
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
          {application.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
          <span>Progress</span>
          <span>{completedTasks}/{totalTasks} tasks</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Requirements Preview */}
      {application.requirements.length > 0 && (
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requirements ({application.requirements.length})</p>
          <div className="flex flex-wrap gap-1">
            {application.requirements.slice(0, 3).map((req, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg">
                {req}
              </span>
            ))}
            {application.requirements.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg">
                +{application.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}