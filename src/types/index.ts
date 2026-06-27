export interface SiteConfig {
  title: string;
  description: string;
  email: string;
  author: string;
  url: string;
  baseurl: string;
  theme: string;
  photoUrl: string;
  social: {
    linkedin: string;
    github: string;
  };
  nav_links: Array<{
    title: string;
    url: string;
  }>;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Power BI' | 'Microsoft Fabric' | 'ETL & SQL' | 'Électronique & Data';
  description: string;
  fullDescription: string;
  metrics: Array<{ label: string; value: string }>;
  tools: string[];
  image: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  daxExample?: string;
  architecture?: string[];
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: Array<{
    name: string;
    level: number; // 0-100
    badge?: string;
  }>;
}

export interface TimelineItem {
  year: string;
  title: string;
  companyOrSchool: string;
  description: string;
  tags: string[];
}
