SELECT
    rp.id AS rolepermid,
    p.id AS permid,
    rp.roleid AS roleid,
    p.system,
    p.perm_desc
FROM
    permissions AS p,
    "RolePerms" AS rp
WHERE
    rp.roleid = $1
    AND rp.permid = p.id
ORDER BY
    p.system,
    rp.id
