-- Add columns to users table for registration workflow
-- request_note: User's note explaining why they need access
-- admin_rejection_note: Admin's reason for rejecting (if applicable)

ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS request_note VARCHAR(256) DEFAULT 'Requesting login id to system',
ADD COLUMN IF NOT EXISTS admin_rejection_note TEXT;
