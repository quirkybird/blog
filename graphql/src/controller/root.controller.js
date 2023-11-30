const { getRecentPosts } = require("../service/root.service");
const path = require("path");
const rootController = {
  getRecentPosts: async (ctx, next) => {
    const recentPosts = await getRecentPosts();
    ctx.body = recentPosts;
    await next();
  },

  uploadImage: async (ctx, next) => {
    if (ctx.request.files) {
      const files = ctx.request.files;
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        coverFileName: files["image"][0].filename,
        blogFileName: path.parse(files["markdown"][0].filename).name
      };
    }
  },
};

module.exports = rootController;
