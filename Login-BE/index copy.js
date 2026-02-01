const express = require("express");
var bodyParser = require("body-parser");

// const db = require("../db/db-index.js");
const c = require("./utilities/constants.js");
const cors = require("cors");
const https = require("https");
const { request } = require("http");

// Initialize express = express();
app = express();

app.use(
  cors({
    origin: "http://localhost",
  })
);
/* serve up static content from the embroidery library */
// app.use(express.static("/home/mhiliger/Embroidery"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MAIN ENTRY POINT User Interface Routes
app.use("/", require("./routes/deletedb.js"));

// function InsUser(pool, user) {
//   let query = `INSERT INTO public.users(id, email, first, last, pwd)
//   Values(DEFAULT, '${user.email}', '${user.first}', '${user.last}', crypt('${user.pwd}',gen_salt('bf')) )`;
//   let result = RunQuery(pool, query);
//   return result;
// }

// function DelTable(pool, name) {
//   let result = false;
//   pool
//     .connect()
//     .then((client) => {
//       return client
//         .query(`DROP TABLE ${name};`)
//         .then((res) => {
//           client.release();
//           result = true;
//         })
//         .catch((err) => {
//           client.release();
//         });
//     })
//     .catch((err) => console.log("unable to connect"));
//   return result;
// }

// // Test Route used to build code snipets
// app.delete("/deleteDb", (req, res) => {
//   let result = false;

//   result = DelTable(pool, "public.users");
//   result = DelTable(pool, "public.roles");
//   result = DelTable(pool, "public.permissions");
//   result = DelTable(pool, 'public."UserRoles"');
//   result = DelTable(pool, 'public."RolePerm"');

//   res.json({ status: "deleted" });
// });

// Test Route used to build code snipets
// app.post("/createDb", (req, res) => {
//   pool.connect().then((client) => {
//     return client
//       .query(
//         `
//         CREATE EXTENSION IF NOT EXISTS pgcrypto;

//         CREATE TABLE public."RolePerm"
// (
//     id serial NOT NULL,
//     roleid numeric(7) NOT NULL,
//     permid numeric(7) NOT NULL,
//     PRIMARY KEY (id)
// );

// ALTER TABLE IF EXISTS public."RolePerm"
//     OWNER to mhiliger;

//         CREATE TABLE public.permissions
// (
//     id serial NOT NULL,
//     permission numeric(5) NOT NULL,
//     "desc" text NOT NULL,
//     PRIMARY KEY (id)
// );

// ALTER TABLE IF EXISTS public.permissions
//     OWNER to mhiliger;
//         CREATE TABLE public."UserRoles"
// (
//     id serial NOT NULL,
//     userid numeric(7) NOT NULL,
//     roldid numeric(7) NOT NULL,
//     PRIMARY KEY (id)
// );

// ALTER TABLE IF EXISTS public."UserRoles"
//     OWNER to mhiliger;

//     CREATE TABLE public.roles
// (
//     id serial NOT NULL,
//     role character varying(15) NOT NULL,
//     "desc" text,
//     PRIMARY KEY (id)
// );

// ALTER TABLE IF EXISTS public.roles
//     OWNER to mhiliger;
//     CREATE TABLE public.users
// (
//     id serial NOT NULL,
//     email text NOT NULL,
//     first text,
//     last text,
//     pwd text NOT NULL,
//     PRIMARY KEY (id),
//     CONSTRAINT email_unique UNIQUE (email)
// );

// ALTER TABLE IF EXISTS public.users
//     OWNER to mhiliger;
// `
//       )
//       .then((res) => {
//         client.release();
//         console.log(res);
//       })
//       .catch((err) => {
//         client.release();
//         console.log(err.stack);
//       });
//   });

//   res.json({ status: "created" });
// });

// Test Route used to build code snipets
// app.post("/initDb", (req, res) => {
//   let user = {
//     id: "DEFAULT",
//     email: "mkhiliger@gmail.com",
//     first: "Mike",
//     last: "Hiliger",
//     pwd: "ABCD",
//   };

//   let result = InsUser(pool, user);

//   res.json({ status: "inserted" });
// });

// ROUTES DEFINITION
// Test Route used to build code snipets
// app.get("/test", async (req, res) => {
//   res.send("finished");
//   console.log("after finished");
// });

// Add defined routes in ../routes

// MAIN ENTRY POINT User Interface Routes
// app.use('/', require('./routes/html/nestapp.js'));

/* Start the HTTPS server with certificates */
var server = https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/web.hiliger.com/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/web.hiliger.com/cert.pem"),
      ca: fs.readFileSync("/etc/letsencrypt/live/web.hiliger.com/chain.pem"),
    },
    app
  )
  .listen(c.hostPort, () => {
    console.log("Listening... on port " + c.hostPort);
  });

// Need to learn more on this

/*
// Following code forcefully terminates the server when ^C is hit
const sockets = new Set();

server.on('connection', (socket) => {
  sockets.add(socket);
  server.once('close', () => {
    sockets.delete(socket);
  });
});


// Forcefully terminates HTTP server.

 const closeServer = (callback) => {
  for (const socket of sockets) {
    socket.destroy();
    sockets.delete(socket);
  }
  server.close(callback);
};


 process.on('uncaughtException', (err) => {
  console.log("Exiting...uncaught Exception" + err.message);
  closeServer();
 });

 process.on('SIGINT', () => {
   console.log("Exiting...^C terminated");
   closeServer();
  });

*/
