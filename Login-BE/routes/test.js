 
        // Go get the permissions for the validated email & password
        dbRunSql(users.refresh, [userRecord[0].email]).then((perms)=>{
    if (perms.length > 0) {
      perms.map((perm) => {
        perms.push(perm.id);
      });
    } else return res.status(403).json({ error: "No permissions for user access forbidden" });

    let uniquePerms = [...new Set(perms)];

    // Create JWT Access Token
    let payload = {
      email: userRecord[0]?.email,
      first: userRecord[0]?.first,
      last: userRecord[0]?.last,
      status: userRecord[0]?.status,
      permissions: uniquePerms,
    };

        // create new access token
        const accessToken = jwt.sign(decoded, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_LIFE });

        }
        ).catch( (error) => {

        })
    
      

      }) 
    } 
    .catch((error) => {
      return res.sendStatus(403);
    });
});
