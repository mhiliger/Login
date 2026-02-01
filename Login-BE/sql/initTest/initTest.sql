INSERT INTO users (email, FIRST, LAST, PASSWORD, status)
    VALUES ('mkhiliger@gmail.com', 'Mike', 'Hiliger', crypt('mkh123', gen_salt('bf')), 'Pending'), ('dghiliger@gmail.com', 'Donna', 'Hiliger', crypt('dgh123', gen_salt('bf')), 'Pending'), ('nmderoller@gmail.com', 'Nicole', 'DeRoller', crypt('nmd123', gen_salt('bf')), 'Pending');

INSERT INTO users (email, FIRST, LAST, status)
    VALUES ('jllega@gmail.com', 'Jennifer', 'Lega', 'Pending');

INSERT INTO roles (ROLE, role_desc)
    VALUES ('AccessAdmin', 'System Login Admin'), ('EmbUser', 'Embroidery User'), ('EmbAdmin', 'Embroidery Administrator'), ('HomeAutoUser', 'Home Automation User'), ('HomeAutoAdmin', 'Home Automation Admin');

INSERT INTO permissions (system, perm_desc)
    VALUES ('SysAccess','Login'), ('SysAccess','Register'), ('SysAccess','User Admin'), ('SysAccess','Role Admin'), ('SysAccess','Permission Admin'), ('HomeAuto','Home Automation Home'), ('HomeAuto','Home Automation Inquire'), ('HomeAuto','Home Automation Control'), ('Embroidery','Embroidery Admin'), ('Embroidery','Embroidery User');

INSERT INTO "UserRoles" (userid, roleid)
    VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (2, 2), (2, 4), (3, 4), (4, 2);

INSERT INTO "RolePerms" (roleid, permid)
    VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (2, 10), (3, 9), (3, 10), (4, 6), (4, 7), (5, 6), (5, 7), (5, 8);

UPDATE
    users
SET
    PASSWORD = crypt('nmd123', gen_salt('bf'))
WHERE
    email = 'jllega@gmail.com';

