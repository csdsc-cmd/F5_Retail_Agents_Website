// Shared TypeScript interfaces and types

export interface Agent {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  heroImage: string;
  benefits: string[];
  useCases: UseCase[];
  uniqueSellingPoints: string[];
  relatedAgents: string[];
  tags: string[];
  route: string;
}

export interface UseCase {
  title: string;
  description: string;
  outcome: string;
}

export interface FormData {
  name: string;
  email: string;
  company: string;
  role?: string;
  phone?: string;
  message?: string;
}

export interface DemoFormData extends FormData {
  companySize: 'small' | 'medium' | 'large' | 'enterprise';
  d365Modules: string[];
  painPoints: string[];
  timeline: 'immediate' | '3-months' | '6-months' | 'planning';
}

export interface ROIFormData extends FormData {
  companySize: 'small' | 'medium' | 'large' | 'enterprise';
  revenue: 'under-10m' | '10-50m' | '50-100m' | '100-500m' | 'over-500m';
  storeCount: number;
  d365Modules: string[];
  currentChallenges: string[];
  manualProcessHours: number;
  averageOrderValue: number;
  monthlyTransactions: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'whitepaper' | 'case-study' | 'datasheet' | 'guide' | 'webinar';
  downloadUrl: string;
  thumbnailUrl: string;
  tags: string[];
  gated: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FormSubmissionResponse {
  id: string;
  message: string;
  redirectUrl?: string;
}

// Utility types
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'ghost';

export type SectionVariant = 'default' | 'gray' | 'dark' | 'primary';