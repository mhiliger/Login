SELECT
    u.id,
    u.email,
    u.first,
    u.last,
    u.status,
    u.created_at,
    u.updated_at,
    u.password_at
FROM
    users AS u
ORDER BY
    u.last
