import React from 'react';
import { BookOpen, Clock, CheckCircle, AlertTriangle, Upload, FileText, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from './StatsCard';
import { UpcomingDeadlines } from './UpcomingDeadlines';
import { RecentActivity } from './RecentActivity';
import { Application } from '../../types';

export function Dashboard() {
  const { applications, recentActivity } = useApp();
  
  const stats = {
    total: applications.length,
    inProgress: applications.filter((app: Application) => app.status === 'in-progress').length,
    submitted: applications.filter((app: Application) => app.status === 'submitted').length,
    upcoming: applications.filter((app: Application) => {
      const deadline = new Date(app.deadline);
      const now = new Date();
      const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 7 && daysUntil > 0;
    }).length
  };

  // TODO: Replace with real activity data if available
  const activities: any[] = [];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your college and scholarship applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={stats.total}
          icon={BookOpen}
          color="blue"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Submitted"
          value={stats.submitted}
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Due This Week"
          value={stats.upcoming}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UpcomingDeadlines />
        <RecentActivity activities={recentActivity} />
      </div>
    </div>
  );
}