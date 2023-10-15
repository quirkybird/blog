const mysql = require("mysql2")
const config = require("./config")

// 创建连接池
const pool = mysql.createPool(config)
// 查看是否连接成功
pool.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("数据库连接失败~")
    } else {
      console.log("数据库连接成功~");
    }
  });
});

module.exports = pool.promise();
