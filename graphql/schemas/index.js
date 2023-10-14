const postSchema = require("./posts")

const typeDefs = [postSchema.schema]

const resolvers = [postSchema.resolver]

module.exports = {
  typeDefs,
  resolvers
}