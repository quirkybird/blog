const Koa = require("koa");
const { bodyParser } = require("@koa/bodyparser");
const cors = require("@koa/cors");

const useRoutes = require("../router/index");

const handle_error = require("./handle_error");

// 创建koa实例
const app = new Koa();
// 添加body解析器
app.use(bodyParser());
//添加一个cors处理中间件
app.use(cors());
// 添加路由
// 这不是一个react-hooks
// eslint-disable-next-line react-hooks/rules-of-hooks
useRoutes(app);
// 增加错误处理
app.on("error", handle_error);

module.exports = app;
