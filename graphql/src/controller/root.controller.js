const {getRecentPosts} = require("../service/root.service")
const rootController = {
  getRecentPosts: async (ctx, next) => {
    const recentPosts = await getRecentPosts()
    ctx.body = recentPosts
    await next()
  }
}

module.exports = rootController