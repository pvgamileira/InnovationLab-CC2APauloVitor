-- Migration: Enforce Row Level Security (RLS) on user_profiles and academic_tasks
-- Active database protection against DevTools/REST API scraping.

-- 1. Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create Policies for user_profiles (based on user_id)
-- Users can view ONLY their own profile
CREATE POLICY "Users can view own profile" 
    ON user_profiles FOR SELECT 
    USING (auth.uid() = user_id);

-- Users can insert ONLY their own profile
CREATE POLICY "Users can insert own profile" 
    ON user_profiles FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Users can update ONLY their own profile
CREATE POLICY "Users can update own profile" 
    ON user_profiles FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 3. Enable RLS on academic_tasks (Ensuring it is enabled even if already configured)
ALTER TABLE academic_tasks ENABLE ROW LEVEL SECURITY;
