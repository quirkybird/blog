const connection = require("../../database");
const fs = require("fs")
const path = require("path")
const rootService = {
  // 获取最近文章
  getRecentPosts: async () => {
    const sql =
      "select * from blog_posts order by create_at DESC limit 12 offset 0";
    const [recentPost] = await connection.execute(sql);
    return recentPost;
  },
  // 获取全部文章
  getAllPosts: async () => {
    const sql = "select * from blog_posts order by create_at DESC";
    const [allPost] = await connection.execute(sql);
    return allPost;
  },
  // 按照id来查询文章
  getPostById: async (post_id) => {
    const sql = "select * from blog_posts where id = ?";
    const [post] = await connection.execute(sql, [post_id]);
    // 将content从文件名称换为文件具体内容
    try {
      post[0].content =  fs.readFileSync(path.join("uploads/blog", `${post[0].content}.md`), "utf-8");
      return post;
    } catch (error) {
      console.log(error)
    }
  },
  // 获取友链
  getFriendLinks: async () => {
    const sql = "select * from blog_friendlinks order by create_at DESC";
    const [friendLinks] = await connection.execute(sql);
    return friendLinks;
  },

  // 创建留言
  createMessage: async (message) => {
    const insertsql = "insert into blog_messages(message) values(?)";
    await connection.execute(insertsql, [message]);
    const querysql = "select * from blog_messages where message = ?";
    const [res] = await connection.execute(querysql, [message]);
    return res[0];
  },
  // 查询留言堆所有内容
  getMessageStack: async () => {
    const sql = "select * from blog_messages order by create_at desc limit 20";
    const [res] = await connection.execute(sql);
    return res;
  },

  // 上传文章
  createNewPost: async ({title, author, categories, tags, content, descr, image}) => {
    const sql = `insert into blog_posts(title, author, categories, tags, content, descr, image)
                values(?, ?, ?, ?, ?, ?, ?)`
    try {
      await connection.execute(sql, [title, author, categories, tags, content, descr, image])
      return {message: "文件已经成功上传"}
    } catch (error) {
      return {message: error.message}
    }
    
    }
};

module.exports = rootService;
