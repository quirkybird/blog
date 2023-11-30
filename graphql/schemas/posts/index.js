const {
  getRecentPosts, 
  getAllPosts,
  getPostById,
  getFriendLinks,
  createMessage,
  getMessageStack,
  createNewPost,
  } = require("../../src/service/root.service")
const fs = require("fs")
const path = require("path")

module.exports = {
  resolver: {
    Query: {
      recentPost: async () => await getRecentPosts(),
      allPost: async () => await getAllPosts(),
      post: async (_parent, _args) => await getPostById(_args.id),
      friendlinks: async () => await getFriendLinks(),
      messageStack: async () => await getMessageStack(),
    }, 
    Mutation: {
      createMessage: async (_parent, _args) => await createMessage(_args.message),
      createNewPost: async (_parent, _args) => await createNewPost(_args.post)
    }
  },
  schema: fs.readFileSync(
    path.resolve(__dirname, "./posts-schema.graphql")
  ).toString()
}