export type ProjectCategory = 'education' | 'healthcare' | 'sanitation' | 'infrastructure' | 'agriculture' | 'economic';
export type ProjectStatus = 'completed' | 'ongoing' | 'planned';

export interface ChiefProfile {
  id: string; // matches communityId
  name: string;
  title: string; // e.g. "Oyokohene"
  stooledYear: string;
  reignTitle: string; // e.g. "Nana Kodua II"
  avatarUrl: string;
  bio: string;
  vision: string;
  education: string[];
  achievements: string[];
}

export interface QueenProfile {
  id: string; // matches communityId
  name: string;
  title: string; // e.g. "Oyokohemaa"
  enstooledYear: string;
  reignTitle: string; // e.g. "Nana Adwoa Akyaamaa II"
  avatarUrl: string;
  bio: string;
  vision: string;
  education: string[];
  achievements: string[];
}

export interface Community {
  id: string;
  name: string;
  desc: string;
  population: string;
  keyProjectsCount: number;
  chiefProfile?: ChiefProfile;
  queenProfile?: QueenProfile;
  coordinates?: { lat: number; lng: number };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  communityId: string;
  communityName: string;
  category: 'festival' | 'durbar' | 'development' | 'cultural' | 'health';
  imageUrl?: string;
  videoUrl?: string;
  videoType?: 'youtube' | 'local';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  communityId: string;
  communityName: string;
  category: ProjectCategory;
  status: ProjectStatus;
  progress: number; // 0 to 100
  budget: string;
  startDate: string;
  completionDate?: string;
  fundingSource: string;
  beneficiaries: string;
  impactSummary: string;
  image?: string;
  videoUrl?: string;
  videoType?: 'youtube' | 'local';
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'chiefs' | 'culture' | 'projects' | 'events';
  imageUrl: string;
}

export interface FeedbackSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  community: string;
  feedbackType: 'suggestion' | 'project_request' | 'complaint' | 'appreciation';
  message: string;
  createdAt: string;
  isRead?: boolean;
}

export interface TraditionalLeader {
  id: string;
  role: string;
  name: string;
  title: string;
  avatarUrl: string;
  bio: string;
}

export interface AdinkraProverb {
  symbol: string;
  translation: string;
  proverb: string;
  meaning: string;
}

export interface AdvisoryBoardMember {
  id: string;
  name: string;
  role: string;
  organization: string;
  bio: string;
  imageUrl: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  gpsAddress: string;
  officeHours: string;
}


