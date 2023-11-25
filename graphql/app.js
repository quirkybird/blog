const https = require("https")
const http = require("http")
const fs = require("fs")
const { ApolloServer } = require("@apollo/server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, resolvers } = require("./schemas");
const {koaMiddleware} = require("@as-integrations/koa")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer")

// 导入配置好的app
const app = require("./src/app");
// 连接数据库
require("./database");
const PORT = 2333;

//开启https服务 
// 签名配置
// const options = {
//   key: fs.readFileSync("./SSL/private.key"),
//   cert: fs.readFileSync("./SSL/certificate.crt")
// }
// const httpsServer = https.createServer(options, app.callback())
const httpServer = http.createServer(app.callback());

// 创建 Apollo Server 实例，传入 schema
const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// 将 Apollo Server 的中间件应用到 Koa 实例上
server.start().then((res) => {
  app.use(
    // '/graphql',
    koaMiddleware(server, {
      context: async ({ ctx }) => ({ token: ctx.headers.token }),
    })
  );

  // 启动 Koa 实例，监听指定端口
  httpServer.listen({ port: PORT }, () => {
    console.log(
      `Server start at http://localhost:${PORT}`
    );
  });
});
