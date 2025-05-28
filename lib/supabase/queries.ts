import { cache } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Profile, Experience, Skill, Project } from '@/lib/types';

// Cache the fetch results using React's cache function
export const getProfile = cache(async (): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    // Return a default profile if none exists
    return {
      name: 'John Doe',
      title: 'Développeur Fullstack',
      email: 'contact@example.com',
      github: 'johndoe',
      photo_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    };
  }

  return data;
});

export const getExperiences = cache(async (): Promise<Experience[]> => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('period', { ascending: false });

  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }

  return data || [];
});

export const getSkills = cache(async (): Promise<Skill[]> => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category');

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data || [];
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
});