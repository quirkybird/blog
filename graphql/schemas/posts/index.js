const recentPost = require("./mock/recentPost")
const fs = require("fs")
const path = require("path")

module.exports = {
  resolver: {
    Query: {
      recentPost: () => recentPost
    }
  },
  schema: fs.readFileSync(
    path.resolve(__dirname, "./posts-schema.graphql")
  ).toString()
}