CREATE TABLE public.permissions (
    id serial NOT NULL,
    system text NOT NULL,
    perm_desc text NOT NULL,
    perm_key text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT perm_desc_unique UNIQUE (perm_desc),
    CONSTRAINT system_perm_key_unique UNIQUE (system, perm_key)
);

ALTER TABLE IF EXISTS public.permissions OWNER TO mhiliger;

