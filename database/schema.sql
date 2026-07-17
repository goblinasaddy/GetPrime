-- schema.sql
-- Setup PostgreSQL / Supabase Schema for TCS NQT Question Engine

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables and types if they exist (for clean setup/reseed)
DROP TABLE IF EXISTS nqt_question_analytics CASCADE;
DROP TABLE IF EXISTS nqt_questions CASCADE;
DROP TYPE IF EXISTS nqt_source_type CASCADE;
DROP TYPE IF EXISTS nqt_difficulty CASCADE;
DROP TYPE IF EXISTS nqt_question_type CASCADE;
DROP TYPE IF EXISTS nqt_section CASCADE;

-- 1. Create custom ENUM types for data integrity
CREATE TYPE nqt_section AS ENUM (
    'Numerical Ability', 
    'Reasoning Ability', 
    'Advanced Quantitative and Reasoning Ability', 
    'Verbal Ability',
    'Advanced Coding Easy',
    'Advanced Coding Medium'
);

CREATE TYPE nqt_question_type AS ENUM (
    'MCQ', 
    'Numeric', 
    'Text', 
    'Coding'
);

CREATE TYPE nqt_difficulty AS ENUM (
    'Easy', 
    'Medium', 
    'Hard'
);

CREATE TYPE nqt_source_type AS ENUM (
    'Original', 
    'Community', 
    'Inspired', 
    'Faculty Contributed'
);

-- 2. Core questions table
CREATE TABLE nqt_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL, -- Human-readable identifier (e.g., 'NQT-0001')
    question_text TEXT NOT NULL,
    question_image_url TEXT, -- Nullable URL for question diagram/figure
    options JSONB, -- JSON Array of objects: [{"id": "A", "text": "Option A"}, ...]
    correct_answer TEXT NOT NULL, -- "A" for MCQs, "45" for numeric, etc.
    explanation TEXT NOT NULL,
    explanation_image_url TEXT, -- Nullable URL for explanation figure
    topic VARCHAR(100) NOT NULL,
    subtopic VARCHAR(100) NOT NULL,
    difficulty nqt_difficulty NOT NULL,
    section nqt_section NOT NULL,
    question_type nqt_question_type NOT NULL DEFAULT 'MCQ',
    estimated_solve_time INTEGER NOT NULL, -- in seconds
    common_mistakes TEXT,
    tags TEXT[] DEFAULT '{}'::TEXT[],
    
    -- Metadata fields
    source nqt_source_type NOT NULL DEFAULT 'Original',
    exam_year INTEGER, -- Nullable past paper year (e.g., 2024)
    frequency INTEGER DEFAULT 1, -- Appears across X papers
    verified BOOLEAN DEFAULT FALSE, -- Trust verification status
    is_active BOOLEAN DEFAULT TRUE, -- Soft delete flag
    created_by UUID, -- References auth.users(id) in Supabase
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Decoupled Analytics table (for future scalability)
CREATE TABLE nqt_question_analytics (
    question_id UUID PRIMARY KEY REFERENCES nqt_questions(id) ON DELETE CASCADE,
    total_attempts INTEGER DEFAULT 0 NOT NULL,
    successful_attempts INTEGER DEFAULT 0 NOT NULL,
    average_solve_time_sec NUMERIC(6, 2) DEFAULT 0.00 NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create indexes for common query patterns
CREATE INDEX idx_nqt_questions_section_active ON nqt_questions(section) WHERE is_active = TRUE;
CREATE INDEX idx_nqt_questions_topic ON nqt_questions(topic);
CREATE INDEX idx_nqt_questions_difficulty ON nqt_questions(difficulty);
CREATE INDEX idx_nqt_questions_verified ON nqt_questions(verified);

-- 5. Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_nqt_questions_modtime
    BEFORE UPDATE ON nqt_questions
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
