-- Create registration tokens table for email verification and password setup
CREATE TABLE IF NOT EXISTS public.registration_tokens (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    token_type TEXT NOT NULL CHECK (token_type IN ('email_verification', 'password_setup')),
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registration_tokens_user_id ON public.registration_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_registration_tokens_token_hash ON public.registration_tokens(token_hash);
