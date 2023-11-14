const https = require("https")
const fs = require("fs")
const { ApolloServer } = require("@apollo/server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, resolvers } = require("./schemas");
const {koaMiddleware} = require("@as-integrations/koa")

// 导入配置好的app
const app = require("./src/app");
// 连接数据库
require("./database");
const PORT = 2333;

// 创建 Apollo Server 实例，传入 schema
const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
});

// 将 Apollo Server 的中间件应用到 Koa 实例上
server.start().then((res) => {
  app.use(
    koaMiddleware(server, {
      context: async ({ ctx }) => ({ token: ctx.headers.token }),
    })
  );
  //开启https服务 
  // 签名配置
  const options = {
    key: fs.readFileSync("./SSL/key.pem"),
    cert: fs.readFileSync("./SSL/cert.pem")
  }
  const httpsServer = https.createServer(options, app.callback())
  // 启动 Koa 实例，监听指定端口
  httpsServer.listen({ port: PORT }, () => {
    console.log(
      `Server start at https://localhost:${PORT}`
    );
  });
});
