require("dotenv").config(); // 載入.env 檔案

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
  } = process.env, // 取得環境變數
  mysql = require("mysql"),
  connection = mysql.createConnection({
    host: `${MYSQL_HOST}:${MYSQL_PORT}`,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });

connection.connect();

connection.query("SELECT * FROM todos", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});
