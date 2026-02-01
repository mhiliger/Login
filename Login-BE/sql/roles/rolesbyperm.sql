SELECT
    p.id AS permid,
    r.id ,
    r.role,
    r.role_desc
FROM
    roles AS r,
    permissions AS p,
    "RolePerms" AS rp

WHERE
    p.id = $1
    AND r.id = rp.roleid
    AND p.id = rp.permid

GROUP BY r.id, p.id