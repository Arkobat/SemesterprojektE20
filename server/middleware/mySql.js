const mysql = require('mysql2')

module.exports =  mysql.createPool({
  connectionLimit: 100,
  host: "54.38.184.93",
  user: "test",
  password: "passw0rd99",
  database: "test",
});