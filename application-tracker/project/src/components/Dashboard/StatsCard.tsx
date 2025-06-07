import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'red';
  change?: string;
  trend?: 'up' | 'down';
}

const colorClasses = {
  blue: {
    bg: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/25',
    text: 'text-blue-600 dark:text-blue-400'
  },
  green: {
    bg: 'from-green-500 to-green-600',
    shadow: 'shadow-green-500/25',
    text: 'text-green-600 dark:text-green-400'
  },
  orange: {
    bg: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/25',
    text: 'text-orange-600 dark:text-orange-400'
  },
  red: {
    bg: 'from-red-500 to-red-600',
    shadow: 'shadow-red-500/25',
    text: 'text-red-600 dark:text-red-400'
  }
};

export function StatsCard({ title, value, icon: Icon, color, change, trend }: StatsCardProps) {
  const colors = colorClasses[color];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${colors.bg} shadow-lg ${colors.shadow}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}