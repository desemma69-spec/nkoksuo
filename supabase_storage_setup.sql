-- ============================================================================
-- NKOSUO DIVISION NEW JUABEN TRADITIONAL AREA - SUPABASE STORAGE SETUP SCRIPT
-- ============================================================================
-- Run this script in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- to register the "njnkosuo" storage bucket and configure open access storage policies.
--
-- Since your app uses a secure administrative passcode ("nkosuo2026" or your custom key)
-- to guard content-uploading controls on the front end, these storage policies will
-- allow public/anonymous download, upload, update, and deletion of media files
-- specifically within the "njnkosuo" bucket.

-- 1. Register the bucket if it doesn't already exist (configured as PUBLIC)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'njnkosuo', 
  'njnkosuo', 
  true,                  -- Publicly readable
  10485760,              -- 10MB file size limit (in bytes)
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm'] -- Allowed types
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop existing policies for the "njnkosuo" bucket to avoid conflicts during re-runs
DROP POLICY IF EXISTS "Public Select Policy for njnkosuo" ON storage.objects;
DROP POLICY IF EXISTS "Public Insert Policy for njnkosuo" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Policy for njnkosuo" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Policy for njnkosuo" ON storage.objects;

-- 3. Create public SELECT policy (Anyone can download/view files in this bucket)
CREATE POLICY "Public Select Policy for njnkosuo" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'njnkosuo');

-- 4. Create public INSERT policy (Allows uploading files into this bucket)
CREATE POLICY "Public Insert Policy for njnkosuo" ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'njnkosuo');

-- 5. Create public UPDATE policy (Allows updating or replacing files)
CREATE POLICY "Public Update Policy for njnkosuo" ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'njnkosuo')
  WITH CHECK (bucket_id = 'njnkosuo');

-- 6. Create public DELETE policy (Allows deleting files)
CREATE POLICY "Public Delete Policy for njnkosuo" ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'njnkosuo');
