export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  details?: string;
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  title?: string;
  role?: string;
  organization?: string;
  company?: string;
  location?: string;
  period: string;
  type: 'education' | 'work' | 'achievement';
  description: string | string[];
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  comment: string;
  rating: number;
}
