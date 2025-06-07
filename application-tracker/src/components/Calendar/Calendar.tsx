import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Application } from '../../types';

export function Calendar() {
  const { applications } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getApplicationsForDay = (day: number): Application[] => {
    const dayDate = new Date(currentYear, currentMonth, day);
    return applications.filter(app => {
      const appDate = new Date(app.deadline);
      return appDate.toDateString() === dayDate.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isToday = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    return dayDate.toDateString() === today.toDateString();
  };

  const isPastDeadline = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    const apps = getApplicationsForDay(day);
    return dayDate < today && apps.some(app => app.status !== 'submitted' && app.status !== 'accepted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
          <p className="text-gray-600">View your application deadlines</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-px mb-4">
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="bg-white h-24" />;
              }

              const dayApplications = getApplicationsForDay(day);
              const todayClass = isToday(day);
              const pastDeadlineClass = isPastDeadline(day);

              return (
                <div key={day} className="bg-white h-24 p-2 relative hover:bg-gray-50 transition-colors duration-200">
                  <div className={`text-sm font-medium mb-1 ${
                    todayClass 
                      ? 'w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center'
                      : pastDeadlineClass
                      ? 'text-red-600'
                      : 'text-gray-900'
                  }`}>
                    {day}
                  </div>
                  
                  {dayApplications.length > 0 && (
                    <div className="space-y-1">
                      {dayApplications.slice(0, 2).map((app, appIndex) => (
                        <div
                          key={appIndex}
                          className={`text-xs px-1 py-1 rounded truncate ${
                            app.type === 'college'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          } ${
                            pastDeadlineClass && app.status !== 'submitted' && app.status !== 'accepted'
                              ? 'bg-red-100 text-red-800'
                              : ''
                          }`}
                          title={app.name}
                        >
                          {app.name}
                        </div>
                      ))}
                      {dayApplications.length > 2 && (
                        <div className="text-xs text-gray-500 px-1">
                          +{dayApplications.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
            <span className="text-sm text-gray-600">College Applications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
            <span className="text-sm text-gray-600">Scholarship Applications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
            <span className="text-sm text-gray-600">Overdue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}