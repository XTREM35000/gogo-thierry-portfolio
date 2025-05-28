
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/supabase/database.types';

const supabaseUrl = 'https://pafmqdqeerreqwokbxee.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZm1xZHFlZXJyZXF3b2tieGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMzA4MzcsImV4cCI6MjA2MzcwNjgzN30.Eo0SCyWS24kWmcM1iiz4RQfr1GT8sHMgW3r8sGh26D4';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    Configuration Supabase manquante !
    Veuillez vérifier les clés Supabase.
  `);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
