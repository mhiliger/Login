const db = require("../db/index.js");
const { user: sql } = require("../sql/sql.js");
const pgp = require("pg-promise")();

const TableName = "public.users";

const CreateSqlFile = "../sql/user create.sql";

const InsertSql =
  "INSERT INTO users(email, first, last, pwd) VALUES ($1, $2, $3, $4, $5)";

const UpdateSql = "";

//User constructor
function User({ email, first, last, password, status }) {
  this.email = email;
  this.first = first;
  this.last = last;
  this.password = password;
  this.status = status;
}
// add a createUser method to the prototype
User.prototype.addUser = async function () {
  try {
    console.log(this);
    let test = [
      this.email,
      this.first,
      this.last,
      this.password,
      this.status,
    ];
    let mysql = sql.add;
    let mystr = pgp.as.format(sql.add, [
      this.email,
      this.first,
      this.last,
      this.password,
      this.status,
    ]);
   const res = await db.none(sql.add, [
      this.email,
      this.first,
      this.last,
      this.password,
      this.status,
    ]);
    return res;
  } catch (error) {
    throw error;
  }
};
User.prototype.createDb = async function () {
  try {
    let mystr = pgp.as.format(sql.create);
    const res = await db.none(sql.create);

    return res;
  } catch (error) {
    throw error;
  }
};
User.prototype.dropDb = async function () {
  try {
let mystr = pgp.as.format(sql.drop, ['users']);
    const res = await db.none(sql.drop, ['users'] );

    return res;
  } catch (error) {
    throw error;
  }
};

module.exports = User;
