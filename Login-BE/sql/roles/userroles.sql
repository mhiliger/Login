SELECT
    u.id AS userid,
    r.id,
    r.role,
    r.role_desc
FROM
    users AS u,
    roles AS r,
    "UserRoles" AS ur
WHERE
    u.id = ur.userid
    AND r.id = ur.roleid
    AND u.id = $1
