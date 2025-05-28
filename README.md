# Portfolio Dynamique avec Next.js et Supabase

Application de portfolio professionnel et générateur de CV en PDF utilisant Next.js 14 et Supabase.

## Fonctionnalités

- Portfolio dynamique avec données stockées dans Supabase
- CV avec mise en page professionnelle
- Galerie de projets avec filtrage par technologies
- Génération de CV et lettre de motivation en PDF
- Interface d'administration pour mettre à jour le contenu
- Mode sombre/clair
- Responsive design

## Configuration

### Prérequis

- Node.js 18+
- Compte Supabase

### Installation

1. Clonez le dépôt
```bash
git clone <repo-url>
cd portfolio-nextjs-supabase
```

2. Installez les dépendances
```bash
npm install
```

3. Configurez Supabase
   - Créez un nouveau projet sur [Supabase](https://supabase.com)
   - Copiez le fichier `.env.local.example` en `.env.local`
   - Remplissez les variables d'environnement avec vos clés Supabase

4. Exécutez les migrations SQL
   - Allez dans l'éditeur SQL de votre projet Supabase
   - Exécutez le contenu des fichiers dans `/supabase/migrations/` dans l'ordre suivant:
     1. `initial_schema.sql`
     2. `seed_data.sql`

5. Démarrez le serveur de développement
```bash
npm run dev
```

## Structure du projet

- `/app`: Routes de l'application (App Router de Next.js)
- `/components`: Composants React
- `/lib`: Utilitaires, types et fonctions
  - `/supabase`: Client Supabase et fonctions de requête
  - `/auth`: Logique d'authentification
  - `/types`: Définitions de types TypeScript
- `/public`: Fichiers statiques

## Utilisation

### Interface d'administration

Pour accéder à l'interface d'administration, vous devez créer un compte utilisateur via Supabase:

1. Allez dans le dashboard Supabase > Authentication > Users
2. Ajoutez un nouvel utilisateur avec email/mot de passe
3. Accédez à `/login` dans l'application pour vous connecter
4. Une fois connecté, accédez à `/admin` pour gérer le contenu

### Génération de PDF

1. Accédez à la page CV via le menu principal
2. Cliquez sur "Générer en PDF"
3. Personnalisez les options selon vos besoins
4. Téléchargez le PDF généré

## Déploiement

### Vercel

Pour déployer sur Vercel:

1. Connectez votre dépôt GitHub à Vercel
2. Configurez les variables d'environnement:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Déployez l'application

## Personnalisation

- Modifiez les styles dans `/app/globals.css`
- Ajoutez vos propres assets dans `/public`
- Personnalisez les composants selon vos besoins

## Licence

MIT