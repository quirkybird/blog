const connection = require("../../database")

const rootService = {
  // 获取最近文章
  getRecentPosts: async () => {
    const sql = "select * from blog_posts order by create_at DESC limit 9 offset 0"
    const [recentPost] = await connection.execute(sql)
    return recentPost
  },
  // 获取全部文章
  getAllPosts: async () => {
    const sql = "select * from blog_posts order by create_at DESC"
    const [allPost] = await connection.execute(sql)
    return allPost
  },
  // 按照id来查询文章
  getPostById: async (post_id) => {
    const sql = "select * from blog_posts where id = ?"
    const [post] = await connection.execute(sql, [post_id])
    return post
  },
  // 获取友链
  getFriendLinks: async () => {
    const sql = "select * from blog_friendlinks order by create_at DESC"
    const [friendLinks] = await connection.execute(sql)
    return friendLinks
  },
}

module.exports = rootService