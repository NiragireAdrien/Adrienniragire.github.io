const mysql = require("mysql");
const mySqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "HOSPITAL_MANAGEMENT_SYSTEM"
});

mySqlConnection.connect(function(error) {
  if (error) {
    console.log(error);
    return;
  }

  console.log("Connected!");
});

module.exports = mySqlConnection;
