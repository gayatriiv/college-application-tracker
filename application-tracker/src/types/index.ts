export interface Application {
  id: string;
  name: string;
  type: 'college' | 'scholarship';
  deadline: string;
  status: 'not-started' | 'in-progress' | 'submitted' | 'accepted' | 'rejected';
  requirements: string[];
  documents: Document[];
  notes: string;
  checklist: ChecklistItem[];
  priority: 'low' | 'medium' | 'high';
  location?: string;
  category?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'pending' | 'completed';
  size: string;
  file?: File;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
  gpa: number;
  interests: string[];
  preferences: {
    collegeTypes: string[];
    scholarshipTypes: string[];
    location: string[];
  };
}

export interface Suggestion {
  id: string;
  name: string;
  type: 'college' | 'scholarship';
  match: number;
  deadline: string;
  description: string;
  category: string;
}