SELECT
    ROW_NUMBER() OVER (ORDER BY p.system, p.id, r.id ) AS id,
    u.id AS userid,
    r.role,
    p.id AS permid,
    p.system,
    p.perm_desc
FROM
    users AS u,
    roles AS r,
    permissions AS p,
    "UserRoles" AS ur,
    "RolePerms" AS rp
WHERE
    u.id = $1
    AND u.id = ur.userid
    AND r.id = ur.roleid
    AND r.id = rp.roleid
    AND p.id = rp.permid
ORDER BY
    u.id,
    r.role,
    p.system,
    p.id
