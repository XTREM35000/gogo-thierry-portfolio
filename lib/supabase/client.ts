import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/supabase/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    Configuration Supabase manquante !
    Créez un fichier .env.local avec :
    NEXT_PUBLIC_SUPABASE_URL=votre_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle
  `);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
