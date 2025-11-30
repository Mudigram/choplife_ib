-- =====================================================
-- Migration: Add User Roles and Review Status
-- Description: Adds role field to user_profiles and status field to reviews
-- Date: 2025-11-30
-- =====================================================

-- 1. Add role column to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' 
CHECK (role IN ('admin', 'verified_reviewer', 'user'));

-- Update existing users to 'user' role
UPDATE user_profiles 
SET role = 'user' 
WHERE role IS NULL;

-- Create index for role queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- 2. Add status column to reviews
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' 
CHECK (status IN ('pending', 'approved', 'rejected'));

-- Set existing reviews to 'approved' to maintain current functionality
UPDATE reviews 
SET status = 'approved' 
WHERE status IS NULL;

-- Create index for status queries
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);

-- 3. Add created_at and updated_at if not exists (for audit trail)
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at 
    BEFORE UPDATE ON reviews 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Verification Queries
-- =====================================================

-- Check role distribution
-- SELECT role, COUNT(*) as count FROM user_profiles GROUP BY role;

-- Check review status distribution
-- SELECT status, COUNT(*) as count FROM reviews GROUP BY status;

-- View all indexes
-- SELECT tablename, indexname FROM pg_indexes WHERE schemaname = 'public' AND tablename IN ('user_profiles', 'reviews');
