// File sql.js

// Proper way to organize an sql provider:
//
// - have all sql files for Users in ./sql/users
// - have all sql files for Products in ./sql/products
// - have your sql provider module as ./sql/index.js

const { QueryFile } = require("pg-promise");
const { join: joinPath } = require("path");

// Helper for linking to external query files:
function sql(file) {
  const fullPath = joinPath(__dirname, file); // generating full path;
  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
  // data for external queries:
  users: {
    tableName: "users",
    fields: ["email", "first", "last", "password", "status"],
    createTable: sql("users/create table.sql"),
    triggers: sql("users/triggers.sql"),
    create: sql("users/create.sql"),
    read: sql("users/users read.sql"),
    usersbyperm: sql("users/usersbyperm.sql"),
    usersbyrole: sql("users/usersbyrole.sql"),
    // Update is dynamic based on input object see update user route
    delete: sql("users/delete.sql"),
    auth: sql("users/auth.sql"),
    authno: sql("users/authno.sql"),
    refresh: sql("users/refresh perms.sql"),
  },
  roles: {
    tableName: "roles",
    fields: ["role", "role_desc"],
    createTable: sql("roles/create table.sql"),
    userroles: sql("roles/userroles.sql"),
    rolesbyperm: sql("roles/rolesbyperm.sql"),
    read: sql("roles/roles read.sql"),
  },
  UserRoles: {
    tableName: "UserRoles",
    fields: ["userid", "roleid"],
    createTable: sql("UserRoles/create table.sql"),
    delete: sql("UserRoles/delete.sql"),
  },
  permissions: {
    tableName: "permissions",
    fields: ["system", "perm_desc"],
    createTable: sql("permissions/create table.sql"),
    read: sql("permissions/perms read.sql"),
    userperms: sql("permissions/userperms.sql"),
  },
  RolePerms: {
    tableName: "RolePerms",
    fields: ["roleid", "permid"],
    createTable: sql("RolePerms/create table.sql"),
    read: sql("RolePerms/roleperms read.sql"),
  },
  Test: {
    tableName: "RolePerms",
    initTest: sql("initTest/initTest.sql"),
  },
};
