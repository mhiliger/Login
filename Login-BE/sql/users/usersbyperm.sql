SELECT
    p.id AS permid,
    u.id ,
    u.email,
    u.status,
    u.first,
    u.last,
    u.updated_at
FROM
    users AS u,
    roles AS r,
    permissions AS p,
    "UserRoles" AS ur,
    "RolePerms" AS rp

WHERE
    p.id = $1
    AND u.id = ur.userid
    AND r.id = ur.roleid
    AND r.id = rp.roleid
    AND p.id = rp.permid

GROUP BY u.id, p.id