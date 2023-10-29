const fs = require("fs");
const { getRecentPosts } = require("../service/root.service");
const path = require("path");
const rootController = {
  getRecentPosts: async (ctx, next) => {
    const recentPosts = await getRecentPosts();
    ctx.body = recentPosts;
    await next();
  },

  uploadImage: async (ctx, next) => {
    if (ctx.file) {
      const file = ctx.file;
      fs.renameSync(
        `uploads/${file.filename}`,
        `uploads/${file.filename + '.' + file.mimetype.split('/')[1]}`,
        (err) => {
          if (err) throw new Error(err);
        }
      );
      ctx.body = "done!";
    }
  },
};

module.exports = rootController;
