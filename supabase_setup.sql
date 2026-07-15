-- ============================================================================
-- NKOSUO DIVISION NEW JUABEN TRADITIONAL AREA - SUPABASE DATABASE SETUP SCRIPT
-- ============================================================================
-- Run this script in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- to automatically provision all required tables, data schemas, and indexes.

-- 1. App Settings Table (Key-Value pair configuration for texts/logo/hero settings)
CREATE TABLE IF NOT EXISTS app_settings (
  "key" TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Communities Table
CREATE TABLE IF NOT EXISTS communities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "desc" TEXT,
  population TEXT,
  "keyProjectsCount" INTEGER DEFAULT 0,
  "chiefProfile" JSONB,
  "queenProfile" JSONB,
  coordinates JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  "communityId" TEXT REFERENCES communities(id) ON DELETE SET NULL,
  "communityName" TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  budget TEXT,
  "startDate" TEXT,
  "completionDate" TEXT,
  "fundingSource" TEXT,
  beneficiaries TEXT,
  "impactSummary" TEXT,
  image TEXT,
  "videoUrl" TEXT,
  "videoType" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Events Table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  time TEXT,
  location TEXT NOT NULL,
  "communityId" TEXT REFERENCES communities(id) ON DELETE SET NULL,
  "communityName" TEXT NOT NULL,
  category TEXT NOT NULL,
  "imageUrl" TEXT,
  "videoUrl" TEXT,
  "videoType" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Feedback Submissions Table
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  community TEXT NOT NULL,
  "feedbackType" TEXT NOT NULL,
  message TEXT NOT NULL,
  "createdAt" TEXT NOT NULL,
  "isRead" BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Traditional Leaders Table
CREATE TABLE IF NOT EXISTS traditional_leaders (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  "avatarUrl" TEXT NOT NULL,
  bio TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Advisory Board Table
CREATE TABLE IF NOT EXISTS advisory_board (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  bio TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Adinkra Proverbs Table
CREATE TABLE IF NOT EXISTS adinkra_proverbs (
  symbol TEXT PRIMARY KEY,
  translation TEXT NOT NULL,
  proverb TEXT NOT NULL,
  meaning TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE traditional_leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisory_board ENABLE ROW LEVEL SECURITY;
ALTER TABLE adinkra_proverbs ENABLE ROW LEVEL SECURITY;

-- Clean and drop existing policies to avoid "policy already exists" errors during re-runs

-- app_settings policies
DROP POLICY IF EXISTS "Allow public select on app_settings" ON app_settings;
DROP POLICY IF EXISTS "Allow public upsert on app_settings" ON app_settings;
CREATE POLICY "Allow public select on app_settings" ON app_settings FOR SELECT USING (true);
CREATE POLICY "Allow public upsert on app_settings" ON app_settings FOR ALL USING (true) WITH CHECK (true);

-- communities policies
DROP POLICY IF EXISTS "Allow public select on communities" ON communities;
DROP POLICY IF EXISTS "Allow public upsert on communities" ON communities;
CREATE POLICY "Allow public select on communities" ON communities FOR SELECT USING (true);
CREATE POLICY "Allow public upsert on communities" ON communities FOR ALL USING (true) WITH CHECK (true);

-- projects policies
DROP POLICY IF EXISTS "Allow public select on projects" ON projects;
DROP POLICY IF EXISTS "Allow public upsert on projects" ON projects;
CREATE POLICY "Allow public select on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public upsert on projects" ON projects FOR ALL USING (true) WITH CHECK (true);

-- events policies
DROP POLICY IF EXISTS "Allow public select on events" ON events;
DROP POLICY IF EXISTS "Allow public upsert on events" ON events;
CREATE POLICY "Allow public select on events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public upsert on events" ON events FOR ALL USING (true) WITH CHECK (true);

-- gallery policies
DROP POLICY IF EXISTS "Allow public select on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow public upsert on gallery" ON gallery;
CREATE POLICY "Allow public select on gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public upsert on gallery" ON gallery FOR ALL USING (true) WITH CHECK (true);

-- feedback policies
DROP POLICY IF EXISTS "Allow public select on feedback" ON feedback;
DROP POLICY IF EXISTS "Allow public upsert on feedback" ON feedback;
CREATE POLICY "Allow public select on feedback" ON feedback FOR SELECT USING (true);
CREATE POLICY "Allow public upsert on feedback" ON feedback FOR ALL USING (true) WITH CHECK (true);

-- traditional_leaders policies
DROP POLICY IF EXISTS "Allow public select on traditional_leaders" ON traditional_leaders;
DROP POLICY IF EXISTS "Allow public upsert on traditional_leaders" ON traditional_leaders;
CREATE POLICY "Allow public select on traditional_leaders" ON traditional_leaders FOR SELECT USING (true);
CREATE POLICY "Allow public upsert on traditional_leaders" ON traditional_leaders FOR ALL USING (true) WITH CHECK (true);

-- advisory_board policies
DROP POLICY IF EXISTS "Allow public select on advisory_board" ON advisory_board;
DROP POLICY IF EXISTS "Allow public upsert on advisory_board" ON advisory_board;
CREATE POLICY "Allow public select on advisory_board" ON advisory_board FOR SELECT USING (true);
CREATE POLICY "Allow public upsert on advisory_board" ON advisory_board FOR ALL USING (true) WITH CHECK (true);

-- adinkra_proverbs policies
DROP POLICY IF EXISTS "Allow public select on adinkra_proverbs" ON adinkra_proverbs;
DROP POLICY IF EXISTS "Allow public upsert on adinkra_proverbs" ON adinkra_proverbs;
CREATE POLICY "Allow public select on adinkra_proverbs" ON adinkra_proverbs FOR SELECT USING (true);
CREATE POLICY "Allow public upsert on adinkra_proverbs" ON adinkra_proverbs FOR ALL USING (true) WITH CHECK (true);
