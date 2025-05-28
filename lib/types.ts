// Type definitions for the application data

export interface Profile {
  id?: string;
  name: string;
  title: string;
  email?: string;
  phone?: string;
  github?: string;
  photo_url?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  imageUrl?: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  screenshot_url?: string;
  github_url?: string;
  live_url?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
