const {getRecentPosts} = require("../../src/service/root.service")
const fs = require("fs")
const path = require("path")

// const handleData = async () => {
//   console.log(await getRecentPosts())
//   return {
//     recentPosts: await getRecentPosts()
//   }
// }

module.exports = {
  resolver: {
    Query: {
      recentPost: async () => await getRecentPosts()
    }
  },
  schema: fs.readFileSync(
    path.resolve(__dirname, "./posts-schema.graphql")
  ).toString()
}