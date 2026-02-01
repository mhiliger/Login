CREATE TABLE IF NOT EXISTS public.users (
    id serial NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    first text COLLATE pg_catalog."default",
    last text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    refreshToken text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    password_at timestamptz,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email))
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users OWNER TO mhiliger;

