import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Application, UserProfile, Suggestion, Document } from '../types';

interface ActivityItem {
  id: string;
  action: string;
  target: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

interface AppContextType {
  applications: Application[];
  setApplications: (applications: Application[] | ((prev: Application[]) => Application[])) => void;
  profile: UserProfile;
  setProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  suggestions: Suggestion[];
  setSuggestions: (suggestions: Suggestion[] | ((prev: Suggestion[]) => Suggestion[])) => void;
  documents: Document[];
  setDocuments: (documents: Document[] | ((prev: Document[]) => Document[])) => void;
  recentActivity: ActivityItem[];
  setRecentActivity: React.Dispatch<React.SetStateAction<ActivityItem[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  location: '',
  gpa: 0,
  interests: [],
  preferences: {
    collegeTypes: [],
    scholarshipTypes: [],
    location: []
  }
};

const mockSuggestions: Suggestion[] = [];
const mockDocuments: Document[] = [];

export function AppProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useLocalStorage<Application[]>('applications', []);
  const [profile, setProfile] = useLocalStorage<UserProfile>('profile', defaultProfile);
  const [suggestions, setSuggestions] = useLocalStorage<Suggestion[]>('suggestions', mockSuggestions);
  const [documents, setDocuments] = useLocalStorage<Document[]>('documents', mockDocuments);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  return (
    <AppContext.Provider
      value={{
        applications,
        setApplications,
        profile,
        setProfile,
        suggestions,
        setSuggestions,
        documents,
        setDocuments,
        recentActivity,
        setRecentActivity
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}