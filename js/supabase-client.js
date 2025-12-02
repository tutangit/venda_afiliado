
const SUPABASE_URL = 'https://zwlzfxxdwuyzbubqgatm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3bHpmeHhkd3V5emJ1YnFnYXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDA0ODgsImV4cCI6MjA4MDE3NjQ4OH0.7pcS7s_yqRwv7QwDHUrxu1QfWWInnQ814dKugu7dOEI';

if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    console.warn('Supabase credentials not set. Please update js/supabase-client.js');
}

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
