const Router = require("@koa/router")
const {getRecentPosts} = require("../controller/root.controller")
const router = new Router()
router.get("/recentposts", getRecentPosts)

module.exports = router
