CREATE TABLE public."UserRoles" (
    id serial NOT NULL,
    userid integer NOT NULL,
    roleid integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES public.users (id) ON DELETE CASCADE,
    FOREIGN KEY (roleid) REFERENCES public.roles (id) ON DELETE CASCADE,
);

ALTER TABLE IF EXISTS public."UserRoles" OWNER TO mhiliger;

