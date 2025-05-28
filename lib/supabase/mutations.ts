'use client';

import { supabase } from '@/lib/supabase/client';
import { Profile, Experience, Skill, Project, ContactFormData } from '@/lib/types';

// Profile mutations
export async function getProfile(): Promise<Profile> {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    throw new Error('Failed to fetch profile');
  }

  return data;
}

export async function updateProfile(profile: Partial<Profile>): Promise<Profile> {
  // First check if profile exists
  const { data: existingProfile } = await supabase
    .from('profile')
    .select('id')
    .single();

  let result;
  
  if (existingProfile) {
    // Update existing profile
    result = await supabase
      .from('profile')
      .update(profile)
      .eq('id', existingProfile.id)
      .select()
      .single();
  } else {
    // Create new profile
    result = await supabase
      .from('profile')
      .insert(profile)
      .select()
      .single();
  }

  if (result.error) {
    console.error('Error updating profile:', result.error);
    throw new Error('Failed to update profile');
  }

  return result.data;
}

// Experience mutations
export async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('period', { ascending: false });

  if (error) {
    console.error('Error fetching experiences:', error);
    throw new Error('Failed to fetch experiences');
  }

  return data || [];
}

export async function createExperience(experience: Omit<Experience, 'id'>): Promise<Experience> {
  const { data, error } = await supabase
    .from('experiences')
    .insert(experience)
    .select()
    .single();

  if (error) {
    console.error('Error creating experience:', error);
    throw new Error('Failed to create experience');
  }

  return data;
}

export async function updateExperience(id: string, experience: Partial<Experience>): Promise<Experience> {
  const { data, error } = await supabase
    .from('experiences')
    .update(experience)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating experience:', error);
    throw new Error('Failed to update experience');
  }

  return data;
}

export async function deleteExperience(id: string): Promise<void> {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting experience:', error);
    throw new Error('Failed to delete experience');
  }
}

// Skill mutations
export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category');

  if (error) {
    console.error('Error fetching skills:', error);
    throw new Error('Failed to fetch skills');
  }

  return data || [];
}

export async function createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
  const { data, error } = await supabase
    .from('skills')
    .insert(skill)
    .select()
    .single();

  if (error) {
    console.error('Error creating skill:', error);
    throw new Error('Failed to create skill');
  }

  return data;
}

export async function updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
  const { data, error } = await supabase
    .from('skills')
    .update(skill)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating skill:', error);
    throw new Error('Failed to update skill');
  }

  return data;
}

export async function deleteSkill(id: string): Promise<void> {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting skill:', error);
    throw new Error('Failed to delete skill');
  }
}

// Project mutations
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }

  return data || [];
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }

  return data;
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }

  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
}

// Contact form submission
export async function submitContactForm(formData: ContactFormData): Promise<void> {
  const { error } = await supabase
    .from('contacts')
    .insert(formData);

  if (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit contact form');
  }
}