import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cgfvxibrcujixrmrkuuw.supabase.co'; // Ganti
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnZnZ4aWJyY3VqaXhybXJrdXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNDQ3MzMsImV4cCI6MjA2OTYyMDczM30.kzQsHnA9U53w68BKDs6CEuMj5ohqy72bEtj016K4wbI'; // Ganti

export const supabase = createClient(supabaseUrl, supabaseKey);
