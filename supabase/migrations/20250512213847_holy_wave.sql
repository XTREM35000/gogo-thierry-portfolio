/*
  # Données initiales pour le portfolio

  Ce script insère les données de base pour le portfolio :
  1. Profil personnel
  2. Expériences professionnelles
  3. Projets
  4. Compétences techniques
*/

-- Profil personnel
INSERT INTO public.profile (name, title, email, phone, github, photo_url)
VALUES (
  'Jean Dupont',
  'Développeur Fullstack / Analyste-Programmeur',
  'jean.dupont@example.com',
  '+33 6 12 34 56 78',
  'jeandupont',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
) ON CONFLICT DO NOTHING;

-- Expériences professionnelles
INSERT INTO public.experiences (title, company, period, description)
VALUES 
  (
    'Développeur Fullstack',
    'Entreprise ABC',
    'Janvier 2021 - Présent',
    'Développement d''applications web avec React, Next.js et Node.js. Mise en place d''architectures microservices et API REST. Utilisation de bases de données PostgreSQL et MongoDB.'
  ),
  (
    'Développeur Front-End',
    'Société XYZ',
    'Mars 2019 - Décembre 2020',
    'Conception et implémentation d''interfaces utilisateur responsives avec React et Redux. Intégration avec des API REST et GraphQL. Utilisation de TypeScript et tests unitaires avec Jest.'
  ),
  (
    'Développeur Junior',
    'Startup Tech',
    'Septembre 2017 - Février 2019',
    'Développement de fonctionnalités front-end avec Angular. Participation à des projets d''équipe en utilisant Git et méthodologie Agile. Support et débogage d''applications existantes.'
  )
ON CONFLICT DO NOTHING;

-- Projets
INSERT INTO public.projects (title, description, tags, screenshot_url, github_url, live_url)
VALUES 
  (
    'Application de Gestion de Tâches',
    'Application web permettant de gérer des projets et des tâches avec suivi de temps et rapports.',
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    'https://images.pexels.com/photos/6956183/pexels-photo-6956183.jpeg',
    'https://github.com/example/taskmanager',
    'https://taskmanager-demo.example.com'
  ),
  (
    'Plateforme E-commerce',
    'Site e-commerce complet avec panier, paiement en ligne et gestion des stocks.',
    ARRAY['Next.js', 'Supabase', 'Stripe', 'Tailwind CSS'],
    'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    'https://github.com/example/ecommerce',
    'https://ecommerce-demo.example.com'
  ),
  (
    'API de Gestion de Contenus',
    'API REST pour la gestion de contenus avec authentification et autorisations.',
    ARRAY['Express', 'MongoDB', 'JWT', 'Swagger'],
    'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    'https://github.com/example/content-api',
    null
  )
ON CONFLICT DO NOTHING;

-- Compétences
INSERT INTO public.skills (category, items)
VALUES 
  (
    'Langages de programmation',
    ARRAY['JavaScript', 'TypeScript', 'Python', 'PHP', 'SQL']
  ),
  (
    'Front-End',
    ARRAY['React', 'Next.js', 'Angular', 'Vue.js', 'HTML5', 'CSS3', 'SASS', 'Tailwind CSS']
  ),
  (
    'Back-End',
    ARRAY['Node.js', 'Express', 'NestJS', 'Django', 'Laravel']
  ),
  (
    'Bases de données',
    ARRAY['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase']
  ),
  (
    'DevOps & Outils',
    ARRAY['Git', 'Docker', 'CI/CD', 'AWS', 'Vercel', 'Netlify']
  )
ON CONFLICT DO NOTHING;