/*
  # Création initiale du schéma de base de données

  1. Tables
    - `profile` (id, name, title, email, phone, github, photo_url)
    - `experiences` (id, title, company, period, description)
    - `projects` (id, title, description, tags, screenshot_url, github_url, live_url)
    - `skills` (id, category, items)
    - `contacts` (id, name, email, subject, message)
  
  2. Sécurité
    - Activation RLS sur toutes les tables
    - Politiques RLS pour admin et lecture publique
*/

-- Création de la table profile
CREATE TABLE IF NOT EXISTS public.profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  email text,
  phone text,
  github text,
  photo_url text,
  created_at timestamptz DEFAULT now()
);

-- Création de la table experiences
CREATE TABLE IF NOT EXISTS public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  period text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Création de la table projects
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  tags text[],
  screenshot_url text,
  github_url text,
  live_url text,
  created_at timestamptz DEFAULT now()
);

-- Création de la table skills
CREATE TABLE IF NOT EXISTS public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  items text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Création de la table contacts
CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Activation du Row Level Security
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour lectures publiques
CREATE POLICY "Lecture publique du profil" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Lecture publique des expériences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Lecture publique des projets" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Lecture publique des compétences" ON public.skills FOR SELECT USING (true);

-- Politiques RLS pour les utilisateurs authentifiés (admin)
CREATE POLICY "Modifications du profil par admin" ON public.profile 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Modifications des expériences par admin" ON public.experiences 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Modifications des projets par admin" ON public.projects 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Modifications des compétences par admin" ON public.skills 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Politique pour les soumissions de contact par tout le monde
CREATE POLICY "Soumissions de contact publiques" ON public.contacts 
  FOR INSERT 
  WITH CHECK (true);