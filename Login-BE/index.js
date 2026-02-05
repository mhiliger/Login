const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const c = require("./utilities/constants.js");
const cors = require("cors");
const https = require("https");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { getSecret } = require("./utilities/getSecret");
const PORT = process.env.REST_PORT || 8080;
var sslKEY;
var sslCERT;
var sslCHAIN;
async function initializeApp() {
  try {
    console.log("🔗 Connecting to Google Secret Manager...");

    // 1. Load secrets FIRST
    const [dbPass, accessToken, refreshToken, sslKey, sslCert, sslChain] = await Promise.all([
      getSecret("login-db-password"),
      getSecret("login-access-token"),
      getSecret("login-refresh-token"),
      getSecret("SSL-KEY-PATH"),
      getSecret("SSL-CERT-PATH"),
      getSecret("SSL-CHAIN-PATH")
    ]);
    sslKEY = sslKey
    sslCERT = sslCert
    sslCHAIN = sslChain
    console.log("sslKEY:", sslKEY);
    console.log("sslCERT:", sslCERT);
    console.log("sslCHAIN:", sslCHAIN);

    process.env.DB_PASSWORD = dbPass;
    process.env.ACCESS_TOKEN_SECRET = accessToken;
    process.env.REFRESH_TOKEN_SECRET = refreshToken;

    console.log("✅ Secrets loaded into environment.");

    // 2. NOW initialize Express and Routes
    startServer();

  } catch (error) {
    console.error("❌ Critical Failure: Could not load secrets from Google.");
    console.error(error);
    process.exit(1);
  }
}

function startServer() {
  const app = express();
  const { createAuthRouter, createVerifyJWT, createPostgresAdapter } = require("@your-org/auth-be");
  const db = require("./db/index.js");
  const authAdapter = createPostgresAdapter(db);

  app.use(cors({
    origin: ["https://rest.hiliger.com:3000", "https://localhost:5173", "https://localhost:5174", "https://127.0.0.1:5173"],
    credentials: true
  }));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  // Configure Authentication Library
  const authConfig = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenLife: "15m",
    refreshTokenLife: "1d",
    loginPath: "/auth",
  };

  // Mount Auth Routes (login, refresh, logout)
  app.use("/", createAuthRouter({ 
    db: authAdapter, 
    config: authConfig 
  }));

  // Configure JWT Verification Middleware
  const verifyJWT = createVerifyJWT({
    accessTokenSecret: authConfig.accessTokenSecret,
    onVerifySuccess: (req, decoded) => {
      // Mapping decoded token to existing app's req properties for backward compatibility
      req.email = decoded.email;
      req.first = decoded.first;
      req.userstatus = decoded.status;
      req.permissions = decoded.permissions;
      req.userId = decoded.userId;
    }
  });

  // Test Routes to initialize db
  app.use("/", require("./routes/deletedb.js"));
  app.use("/", require("./routes/createdb.js"));
  app.use("/", require("./routes/initdb.js"));

  app.use(verifyJWT);



  app.use("/", require("./routes/user create.js"));

  app.use("/", require("./routes/users read.js"));

  app.use("/", require("./routes/user update.js"));

  app.use("/", require("./routes/user delete.js"));

  app.use("/", require("./routes/userroles read.js"));

  app.use("/", require("./routes/userrole create.js"));

  app.use("/", require("./routes/userrole delete.js"));

  app.use("/", require("./routes/usersbyperm read.js"));

  app.use("/", require("./routes/usersbyrole read.js"));

  app.use("/", require("./routes/roles read.js"));

  app.use("/", require("./routes/role create.js"));

  app.use("/", require("./routes/role delete.js"));

  app.use("/", require("./routes/role update.js"));

  app.use("/", require("./routes/rolesbyperm read.js"));

  app.use("/", require("./routes/perms read.js"));

  app.use("/", require("./routes/perm delete.js"));

  app.use("/", require("./routes/perm create.js"));

  app.use("/", require("./routes/perm update.js"));

  app.use("/", require("./routes/userperms read.js"));



  app.use("/", require("./routes/roleperms read.js"));

  app.use("/", require("./routes/roleperm delete.js"));

  app.use("/", require("./routes/roleperms create.js"));



  // Catch route for all other requests

  app.all("*", (req, res) => {

    res.status(404);

    if (req.accepts("html")) {

      res.send("replace with sendFile and name of html file.");

    } else if (req.accepts("json")) {

      res.send("replace with json { 'error': '404 Not Found } ");

    } else {

      res.type("txt").send("404 Not Found");

    }

  });

  // Create HTTPS Server
  https.createServer({
    key: fs.readFileSync(sslKEY),
    cert: fs.readFileSync(sslCERT),
    ca: fs.readFileSync(sslCHAIN)
  }, app)
    .listen(PORT, () => {
      console.log("Listening... on port " + PORT);
    });
}

// Start the whole process
initializeApp();