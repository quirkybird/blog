const connection = require("../../database")


const rootService = {
  getRecentPosts: async () => {
    const sql = "select * from blog_posts limit 9 offset 0"
    const [recentPost] = await connection.execute(sql)
    return recentPost
  }
}

module.exports = rootService