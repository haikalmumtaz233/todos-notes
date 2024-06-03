const mysql = require("mysql2");

const config = {
  host: "34.122.7.171",
  user: "root",
  password: "alfinganteng",
  database: "todos-notes",
};

const connect = mysql.createConnection(config);

connect.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = connect;