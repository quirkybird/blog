require("dotenv").config()

// 数据库连接基本配置
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_DATABASE,
  MYSQL_PASSWORD
} = process.env

const config =  {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD
}

module.exports = config