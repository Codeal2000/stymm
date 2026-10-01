export type PortalSection = 'public' | 'member' | 'admin' | 'mobile_preview';

export type PublicNav = 
  | 'home'
  | 'about'
  | 'movement'
  | 'achievements'
  | 'join'
  | 'news'
  | 'events'
  | 'resources'
  | 'donate'
  | 'store'
  | 'contact'
  | 'login';

export type MemberNav = 
  | 'dashboard'
  | 'profile'
  | 'network'
  | 'ward'
  | 'canvassing'
  | 'adopt_pu'
  | 'events'
  | 'training'
  | 'content'
  | 'news'
  | 'achievements'
  | 'donations'
  | 'store'
  | 'surveys'
  | 'helpdesk'
  | 'settings';

export type AdminRole = 
  | 'national'
  | 'state'
  | 'lga'
  | 'ward'
  | 'pu'
  | 'field_ops'
  | 'finance'
  | 'content_media'
  | 'developer';

export interface CanvassRecord {
  id: string;
  voterName: string;
  phone: string;
  gender: 'Male' | 'Female';
  ageRange: '18-24' | '25-35' | '36-49' | '50+';
  state: string;
  lga: string;
  ward: string;
  pu: string;
  pvcStatus: 'Has PVC' | 'Needs Collection' | 'Unregistered';
  supportSentiment: 'Strong Supporter' | 'Leaning Supporter' | 'Undecided' | 'Opposed';
  keyIssues: string[];
  notes: string;
  canvasserName: string;
  createdAt: string;
}

export interface PollingUnit {
  id: string;
  code: string;
  name: string;
  ward: string;
  lga: string;
  state: string;
  registeredVoters: number;
  contactedVoters: number;
  pledgedSupporters: number;
  adoptionStatus: 'Adopted' | 'Available' | 'Target Priority';
  adoptedBy?: string;
  mobilizationTarget: number;
  fundsRaised: number;
  agentAssigned: boolean;
  agentName?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  state: string;
  category: 'Rally' | 'Town Hall' | 'Youth Summit' | 'Canvassing Drive' | 'PVC Clinic';
  attendeesCount: number;
  maxCapacity: number;
  description: string;
  isRsvp?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'Press Release' | 'Campaign Dispatch' | 'Policy Announcement' | 'Grassroots Spotlight';
  readTime: string;
  content: string;
  author: string;
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'Apparel' | 'Caps & Hats' | 'Accessories' | 'Campaign Bundles';
  price: number;
  stock: number;
  description: string;
  sizes?: string[];
  colors?: string[];
}

export interface TrainingLesson {
  id: string;
  title: string;
  duration: string;
  category: 'Canvassing 101' | 'Voter Mobilization' | 'Digital Advocacy' | 'Election Day Shield';
  summary: string;
  keyPoints: string[];
  completed?: boolean;
}

export interface CartItem {
  item: StoreItem;
  quantity: number;
  size?: string;
}
