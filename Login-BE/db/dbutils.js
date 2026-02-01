const pgp = require("pg-promise")();
const db = require("./index.js");

function dbInsert(table, fields, values) {
  return new Promise(async (resolve, reject) => {
    try {
      const colSet = new pgp.helpers.ColumnSet(fields, {
        table: table,
      });

      const query = pgp.helpers.insert(values, colSet) + " RETURNING id";

      let result = await db.manyOrNone(query);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function dbDeleteList(tableName, idList) {
  let deletedRecords = [];
  let failedRecords = [];

  try {
    await db.tx(async (t) => {
      for (const obj of idList) {
        const keys = Object.keys(obj);
        const values = Object.values(obj);
        let delQuery = "DELETE FROM $1:name WHERE"
        let delParms = [tableName];
        let placeIndex = 1;
        for (let i = 0; i < keys.length; i++) {
          placeIndex++
          delQuery = delQuery + " $" + placeIndex.toString() + ":name"
          placeIndex++
          delQuery = delQuery + "=$" + placeIndex.toString() + ":value"

          // if not last item then use AND clause
          if (i !== keys.length - 1) {
            delQuery = delQuery + " AND "
          }

          delParms.push(keys[i])
          delParms.push(values[i])
          // const columns = keys.map((key) => pgp.as.name(key)).join(', ');
          // const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(', ');
          // const deleteQuery = `DELETE FROM ${tableName} WHERE (${columns}) = (${placeholders}) RETURNING *`;
        }
        delQuery = delQuery + " RETURNING *"

        try {
          const result = await t.any(delQuery, delParms);
          if (result.length > 0) {
            deletedRecords.push(...result);
          } else {
            failedRecords.push(obj);
          }
        } catch (err) {
          failedRecords.push(obj);
        }
      }
    });
    return ({ deletedRecords, failedRecords })

  } catch (err) {
    return { error: "Error occured during deleteList" };
  }
}


function dbDelete(table, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.one(
        "DELETE FROM $1:name WHERE id=$2 RETURNING id",
        [table, id]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

function dbRunSql(sqlQuery, values = []) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.manyOrNone(sqlQuery, values);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

function dbUpdate(table, id, obj) {
  return new Promise(async (resolve, reject) => {
    let query = "UPDATE " + table + " SET";

    //Remove any undefined fields from data
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined) delete obj[key];
    });

    // append any remaining defined fields to the query
    // special handle fields named "password" to encrypt
    let i = 1;
    Object.keys(obj).forEach((key) => {
      if (key === "password") {
        query += ` ${key}=crypt($${i}, gen_salt('bf')),`;
      } else {
        query += ` ${key}=$${i},`;
      }
      i++;
    });

    // Remove exceeding comma
    query = query.slice(0, -1);
    // Add id where clause and return impacted id clause
    query += ` WHERE id=$${i} RETURNING id`;

    // setup values array for query
    let values = Object.values(obj); // ['foo', 'bar']

    // add id value from param id to support where clause
    values.push(id);
    try {
      let result = await db.manyOrNone(query, values);
      console.log(result);
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

module.exports.dbInsert = dbInsert;
module.exports.dbUpdate = dbUpdate;
module.exports.dbDelete = dbDelete;
module.exports.dbRunSql = dbRunSql;
module.exports.dbDeleteList = dbDeleteList;
