-- =====================================================
-- Storage Buckets and Policies
-- Description: Creates storage buckets for images and sets up RLS policies
-- Date: 2025-11-30
-- =====================================================

-- Note: Run this in Supabase SQL Editor or via Dashboard

-- 1. Create storage buckets (if they don't exist)
-- You may need to create these via the Supabase Dashboard > Storage
-- Buckets needed:
--   - place-images (public)
--   - event-images (public)
--   - review-images (public)
--   - avatars (already exists, public)

-- 2. Storage policies for place-images bucket
CREATE POLICY "Authenticated users can upload place images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'place-images');

CREATE POLICY "Public can view place images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'place-images');

CREATE POLICY "Admins can delete place images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'place-images' AND auth.uid() IN (
  SELECT id FROM user_profiles WHERE role = 'admin'
));

-- 3. Storage policies for event-images bucket
CREATE POLICY "Authenticated users can upload event images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Public can view event images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'event-images');

CREATE POLICY "Admins can delete event images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'event-images' AND auth.uid() IN (
  SELECT id FROM user_profiles WHERE role = 'admin'
));

-- 4. Storage policies for review-images bucket
CREATE POLICY "Authenticated users can upload review images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'review-images');

CREATE POLICY "Public can view review images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'review-images');

CREATE POLICY "Users can delete their own review images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'review-images' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR 
   auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'admin'))
);

-- =====================================================
-- Instructions
-- =====================================================

-- 1. Go to Supabase Dashboard > Storage
-- 2. Create the following buckets (if they don't exist):
--    - place-images (public: true)
--    - event-images (public: true)
--    - review-images (public: true)
-- 3. Run this SQL in the SQL Editor
-- 4. Verify policies are created in Storage > Policies
