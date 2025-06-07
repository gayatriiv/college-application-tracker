import React from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Application } from '../../types';

export function UpcomingDeadlines() {
  const { applications } = useApp();
  
  const upcomingApps = applications
    .filter(app => {
      const deadline = new Date(app.deadline);
      const now = new Date();
      return deadline > now;
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  const getDaysUntil = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: Application['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Deadlines</h2>
      </div>
      
      {upcomingApps.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No upcoming deadlines</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingApps.map((app) => {
            const daysUntil = getDaysUntil(app.deadline);
            const isUrgent = daysUntil <= 3;
            
            return (
              <div
                key={app.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  isUrgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{app.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(app.priority)}`}>
                        {app.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Due: {new Date(app.deadline).toLocaleDateString()}</span>
                      <span className={isUrgent ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {daysUntil === 0 ? 'Due today!' : `${daysUntil} days left`}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}