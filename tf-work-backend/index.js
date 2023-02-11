const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const util = require("util");
const { exit } = require("process");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
});
connection.connect((err) => {
  if (err) console.error(err);
  else {
    connection.query("CREATE DATABASE IF NOT EXISTS tfwork ", (err) => {
      if (err) console.error(err);
      else {
        connection.query("USE tfwork");
        connection.query(
          "CREATE TABLE IF NOT EXISTS users(ID int NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(1200),password varchar(1200) UNIQUE,email varchar(1200) UNIQUE,usertype varchar(1200),address varchar(1200) ,photo varchar(1200) ,bio varchar(1200) ,skills varchar(1200) ,worked varchar(1200) )"
        );
        connection.query(
          "CREATE TABLE IF NOT EXISTS projects(title varchar(1200) ,details varchar(1200) ,price varchar(1200) ,fromClient varchar(1200) ,bidderlist varchar(1200) ,skills varchar(1200) )"
        );
      }
    });
  }
});

const app = express();

app.use(cors());
// listen on port 4000
app.listen(process.env.PORT || 4000, () => console.log("Server is running"));
app.use(express.json({ limit: "200mb" }));

// login logic
app.post("/api/login", (req, res) => {
  console.log(req.body);
  const { user, password } = req.body;
  connection.query(
    "SELECT usertype as type FROM users WHERE email=? AND password=?",
    [user, password],
    (error, results, fields) => {
      if (error || !results || results.length === 0) {
        console.log(error);
        res.send(
          JSON.stringify({
            token: user,
            status: "ERR",
            usertype: password,
          })
        );
      } else {
        console.log(results);
        res.send(
          JSON.stringify({
            token: user,
            status: "OK",
            usertype: results[0].type,
          })
        );
      }
    }
  );
});

// Sign up logic
function createAccount(name, password, email, usertype, address) {
  connection.query(
    'INSERT INTO `users`(name,password,email,usertype,address,photo,bio,skills,worked) VALUES(?,?,?,?,?," "," "," "," ")',
    [name, password, email, usertype, address],
    (error, result) => {
      if (error) {
        console.log(error);
        return false;
      }
      console.log("data write ok");
      return true;
    }
  );
}

app.post("/api/signup", (req, res) => {
  console.log(req.body);
  const { name, password, email, usertype, address } = req.body;
  createAccount(name, password, email, usertype, address);
  res.send(
    JSON.stringify({
      status: 200,
    })
  );
});

app.post("/api/profile/update", (req, res) => {
  const { photo, name, email, skills, bio, worked } = req.body;
  connection.query(
    "UPDATE users SET photo=?,name=?,skills=?,bio=?,worked=? WHERE email=?",
    [photo, name, skills, bio, worked, email],
    (err) => {
      if (err)
        res.send(
          JSON.stringify({
            status: err,
          })
        );
      else
        res.send(
          JSON.stringify({
            status: 200,
          })
        );
    }
  );
});

app.post("/api/bid", (req, res) => {
  const { projectid } = req.body;
  connection.query(
    "SELECT bidderlist as bidl FROM projects ",
    (err, result) => {
      if (err) {
        res.send(
          JSON.stringify({
            status: err,
          })
        );
        return 0;
      }
      const arr = JSON.parse(result[0].bidl);
      arr.push(req.body);
      connection.query(
        "UPDATE projects SET bidderlist=? WHERE ID=?",
        [JSON.stringify(arr), projectid],
        (err, result) => {
          if (err) {
            res.send(
              JSON.stringify({
                status: err,
              })
            );
            return 0;
          } else {
            res.send(
              JSON.stringify({
                status: "OK",
              })
            );
          }
        }
      );
    }
  );
});

app.post("/api/project", (req, res) => {
  const { filter, filterType } = req.body;
  const ft = filterType === 1 ? "fromClient" : "skill";
  connection.query(
    `SELECT * FROM projects ` +
      (filter && filterType ? `WHERE ${ft}="${filter}"` : ``),
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(JSON.stringify([]));
      } else {
        res.send(JSON.stringify(result));
        console.log(result);
      }
    }
  );
});

app.get("/api/project/details?", (req, res) => {
  const { id } = req.query;
  connection.query(`SELECT * FROM projects WHERE ID="${id}"`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({}));
    } else {
      res.send(JSON.stringify(result[0]));
      console.log(result);
    }
  });
});

app.post("/api/project/new", (req, res) => {
  const { title, details, from, price, skills } = req.body;
  connection.query(
    "INSERT INTO `projects`(title,details,price,fromClient,bidderlist,skills) VALUES(?,?,?,?,'[]',?)",
    [title, details, price, from, skills],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(
          JSON.stringify({
            status: "ERR",
          })
        );
      } else {
        console.log("OK");
        res.send(JSON.stringify({ status: "OK" }));
      }
    }
  );
});

app.get("/api/profile", (req, res) => {
  const { id } = req.query;
  connection.query(`SELECT * FROM users WHERE email="${id}"`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({}));
    } else {
      res.send(JSON.stringify(result[0]));
      console.log(result);
    }
  });
});
