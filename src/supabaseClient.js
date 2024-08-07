// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase URL and key
const SUPABASE_URL = 'https://bbguorqgdmuaykxaykvk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZ3VvcnFnZG11YXlreGF5a3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMjYxOTIsImV4cCI6MjAzNzYwMjE5Mn0.UxRcCLXSy92spiaBJQWfHuV8R0p7mFSCZ4pbDMwvyOw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
