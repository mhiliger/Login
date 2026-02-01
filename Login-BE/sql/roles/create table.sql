CREATE TABLE public.roles (
    id serial NOT NULL,
    role character varying(20) NOT NULL,
    role_desc text,
    PRIMARY KEY (id),
    CONSTRAINT role_unique UNIQUE (ROLE)
);

ALTER TABLE IF EXISTS public.roles OWNER TO mhiliger;

