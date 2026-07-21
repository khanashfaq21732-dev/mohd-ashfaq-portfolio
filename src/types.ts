/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  category: string;
  status: 'Completed' | 'In Progress' | 'Beta';
  date: string;
  liveDemoUrl?: string;
  gitHubUrl?: string;
  imageUrl: string;
  caseStudy?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  publishedDate: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface Comment {
  id: string;
  blogId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0 to 100
  category: 'Languages' | 'Core CS' | 'Web & Frameworks' | 'Tools & Platforms';
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'work' | 'education' | 'achievement';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  avatarUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'certificate' | 'award';
  url: string;
  description?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  country: string;
  browser: string;
  device: string;
  referrer: string;
}

export interface SystemSettings {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}
