const express = require("express");
const pgp = require("pg-promise")();
const { result } = require("../db/index.js");
const db = require("../db/index.js");
const User = require("../models/User.js");
const {
  users,
  roles,
  UserRoles,
  permissions,
  RolePerms,
  Test,
  sql,
} = require("../sql/sql.js");

async function dropDb() {
  let result = undefined;
  await db
    .task((t) => {
      const q1 = t.none("DROP TABLE $1:name", UserRoles.tableName);
      const q2 = t.none("DROP TABLE $1:name", RolePerms.tableName);
      const q3 = t.none("DROP TABLE $1:name", permissions.tableName);
      const q4 = t.none("DROP TABLE $1:name", users.tableName);
      const q5 = t.none("DROP TABLE $1:name", roles.tableName);

      return t.batch([q1, q2, q3, q4, q5]);
    })
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
}

async function createDb() {
  let result = undefined;
  await db
    .task((t) => {
      const q1 = t.none(users.createTable);
      const q2 = t.none(users.triggers);
      const q3 = t.none(roles.createTable);
      const q4 = t.none(permissions.createTable);
      const q5 = t.none(UserRoles.createTable);
      const q6 = t.none(RolePerms.createTable);

      return t.batch([q1, q2, q3, q4, q5, q6]);
    })
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
}

async function initTestDb() {
  let result = undefined;

  await db
    .task((t) => {
      let mysql = pgp.as.format(Test.initTest);
      const q1 = t.none(Test.initTest);
      console.log("test");
      //   const q2 = t.none(roles.create);
      //   const q3 = t.none(UserRoles.create);
      //   const q4 = t.none(permissions.create);
      //   const q5 = t.none(RolePerms.create);

      return t.batch([q1]);
    })
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      result = error;
    });
  return result;
}

module.exports.dropDb = dropDb;
module.exports.createDb = createDb;
module.exports.initTestDb = initTestDb;
