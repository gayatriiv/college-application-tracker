import React from 'react';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Calendar, 
  User, 
  Lightbulb,
  GraduationCap,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'applications', name: 'Applications', icon: BookOpen },
  { id: 'documents', name: 'Documents', icon: FileText },
  { id: 'calendar', name: 'Calendar', icon: Calendar },
  { id: 'suggestions', name: 'AI Suggestions', icon: Lightbulb },
  { id: 'profile', name: 'Profile', icon: User },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AppTracker
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">College & Scholarships</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                  } ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-yellow-500 transition-colors duration-200" />
          ) : (
            <Moon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
          )}
          <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
}