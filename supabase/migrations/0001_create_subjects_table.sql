-- Migration: Create subjects table and configure RLS

-- 1. Create the subjects table
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    professor TEXT NOT NULL,
    workload INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Users can only SELECT their own subjects
CREATE POLICY "Users can select their own subjects"
    ON subjects FOR SELECT
    USING (auth.uid() = user_id);

-- Users can only INSERT their own subjects
CREATE POLICY "Users can insert their own subjects"
    ON subjects FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can only UPDATE their own subjects
CREATE POLICY "Users can update their own subjects"
    ON subjects FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can only DELETE their own subjects
CREATE POLICY "Users can delete their own subjects"
    ON subjects FOR DELETE
    USING (auth.uid() = user_id);
