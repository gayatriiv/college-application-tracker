import React from 'react';
import { Activity } from 'lucide-react';

interface ActivityItem {
  id: number | string;
  action: string;
  target: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <Icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-gray-600 dark:text-gray-400"> for </span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{activity.target}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-center py-8">No recent activity</div>
        )}
      </div>
    </div>
  );
}