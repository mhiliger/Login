const { getSecret } = require("../utilities/getSecret");

const pgp = require("pg-promise")();
require("dotenv").config();


const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: "SysAccess",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
  // password: await getSecret("login-db-password")
};
const db = pgp(cn);

module.exports = db;
