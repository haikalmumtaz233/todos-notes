const mysql = require("mysql2");

const config = {
  host: "34.122.36.119",
  user: "root",
  password: "9yuDqbG>L\Qq+PFh",
  database: "todos-notes",
};

const connect = mysql.createConnection(config);

connect.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = connect;