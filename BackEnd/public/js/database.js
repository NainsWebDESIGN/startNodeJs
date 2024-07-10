require("dotenv").config(); // 載入.env 檔案
const mysql = require("mysql");
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env; // 取得環境變數


let connection = null;


exports.query = (need) => {
  connection = mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  })
  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(need, (err, data) => {
      if (err) throw err;
      switch (data) {
        case undefined:
          reject(new Error("Error rows is undefined"));
          break;
        case null:
          reject(new Error("Error rows is undefined"));
          break;
        default:
          resolve(data);
          break;
      }

      //! 除了 SELECT 其餘回傳一率都是 OkPacket, 屬性有以下幾種
      //! fieldCount: 受影響的字段數量
      //! affectedRows: 表示受影響的行數，例如執行INSERT、UPDATE、DELETE語句時，表示插入、更新或刪除的行數
      //! insertId: 如果有自動生成的主鍵(比如自增ID)，則表示插入數據的 ID，通常在執行 INSERT 語句時返回
      //! serverStatus: 表示 MySQL 服務器的狀態信息
      //! warningCount: 表示服務氣返回的警告數量
      //! message: 與操作相關的信息
      //! protocol41: 指示 MySQL 服務器是否使用了協議版本 4.1
      //! changedRows: 指示執行 UPDATE 或 DELETE 操作後，受影響的行數
    });
  }).finally(() => connection.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection:", err);
      return;
    }

    console.log("MySQL connection closed");
  }));
};


//* connection.query("SELECT * FROM todos", (err, data) => {
//*   if (err) throw err;
//*   console.log(data);
//* });
//* connection.end();
