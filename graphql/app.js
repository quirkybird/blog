const Koa = require("koa")
const {ApolloServer} = require("apollo-server-koa")
const {makeExecutableSchema} = require("@graphql-tools/schema")
const {typeDefs, resolvers}  = require("./schemas")
const PORT = 2333

const server = new ApolloServer({
  schema: makeExecutableSchema({typeDefs, resolvers})
})

const app = new Koa()
server.start().then(res => {
  server.applyMiddleware({app})

  app.listen({port: PORT}, () => {
    console.log(`Server start at http://localhost:${PORT + server.graphqlPath}`)
  })
});


