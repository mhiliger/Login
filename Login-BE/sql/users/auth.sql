SELECT
    p.id
FROM
    users AS u,
    roles AS r,
    permissions AS p,
    "UserRoles" AS ur,
    "RolePerms" AS rp
WHERE
    u.email = $1
    AND u.PASSWORD = crypt($2, PASSWORD)
    AND u.id = ur.userid
    AND r.id = ur.roleid
    AND r.id = rp.roleid
    AND p.id = rp.permid
