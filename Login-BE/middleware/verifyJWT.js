const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  console.log(req?.headers);
  const authHeader = req?.headers["authorization"];
  if (!authHeader) {
    console.log("No Header");
    return res.status(401).json({ error: "no header to verify jwt" }); // unauthorized
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];

  try {
    var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // Good token
    // set decoded items in the request to make them available
    req.email = decoded.email;
    req.first = decoded.first;
    req.userstatus = decoded.status;
    req.permissions = decoded.permissions;
    console.log(req);

    next();

  } catch (error) {
    return res.status(403).json({ error: "error verifying jwt" });
  }

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
  //   if (err) {
  //     console.log("Error verifying jwt");
  //     return res.status(403).json({ error: "error verifying jwt" });
  //   } // Forbidden invalid token

  // set decoded items in the request to make them available
  //   req.email = decoded.email;
  //   req.first = decoded.first;
  //   req.userstatus = decoded.status;
  //   req.permissions = decoded.permissions;
  //   console.log(req);

  //   next();
  // });
}

module.exports = verifyJWT;
