-- Migrate existing user status values to new registration workflow status values
-- Old values: 'Pending', 'Active', 'Inactive'
-- New values: 'PENDING_VERIFICATION', 'PENDING_APPROVAL', 'APPROVED', 'ACTIVE', 'REJECTED'

UPDATE public.users SET status = 'ACTIVE' WHERE status = 'Active';
UPDATE public.users SET status = 'PENDING_APPROVAL' WHERE status = 'Pending';
UPDATE public.users SET status = 'REJECTED' WHERE status = 'Inactive';
