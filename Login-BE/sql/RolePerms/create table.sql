CREATE TABLE public."RolePerms" (
    id serial NOT NULL,
    roleid integer NOT NULL,
    permid integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (roleid) REFERENCES public.roles (id) ON DELETE CASCADE,
    FOREIGN KEY (permid) REFERENCES public.permissions (id) ON DELETE CASCADE, 
);

ALTER TABLE IF EXISTS public."RolePerms" OWNER TO mhiliger;

