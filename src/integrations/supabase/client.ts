import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://urhjqqtwffmqgjzawhoe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyaGpxcXR3ZmZtcWdqemF3aG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjUzOTksImV4cCI6MjA5NTEwMTM5OX0.qWRC_2tSyeqLxzfEbD3dAvonSVuJOMXT73xQ3hv_blA";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
