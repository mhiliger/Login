SELECT
    r.id AS roleid,
    u.id ,
    u.email,
    u.status,
    u.first,
    u.last,
    u.updated_at
FROM
    users AS u,
    roles AS r,
    "UserRoles" AS ur

WHERE
    r.id = $1
    AND u.id = ur.userid
    AND r.id = ur.roleid
    
GROUP BY u.id, r.id