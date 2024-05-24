const mysql = require("mysql2");

const config = {
  host: "34.172.140.230",
  user: "root",
  password: ">m[/_fI2y#eCokmK",
  database: "todos-notes",
};

const connect = mysql.createConnection(config);

connect.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = connect;