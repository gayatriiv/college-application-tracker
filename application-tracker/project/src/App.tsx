import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Applications } from './components/Applications/Applications';
import { Documents } from './components/Documents/Documents';
import { Calendar } from './components/Calendar/Calendar';
import { Suggestions } from './components/Suggestions/Suggestions';
import { Profile } from './components/Profile/Profile';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'applications':
        return <Applications />;
      case 'documents':
        return <Documents />;
      case 'calendar':
        return <Calendar />;
      case 'suggestions':
        return <Suggestions />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <AppProvider>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              {renderView()}
            </div>
          </main>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;