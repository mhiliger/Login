-- Migration to add perm_key column to permissions table

-- 1. Add perm_key column (initially nullable)
ALTER TABLE permissions ADD COLUMN IF NOT EXISTS perm_key text;

-- 2. Populate perm_key with the existing id
UPDATE permissions SET perm_key = id::text WHERE perm_key IS NULL;

-- 3. Set perm_key to NOT NULL
ALTER TABLE permissions ALTER COLUMN perm_key SET NOT NULL;

-- 4. Add the unique constraint on (system, perm_key)
ALTER TABLE permissions ADD CONSTRAINT system_perm_key_unique UNIQUE (system, perm_key);
