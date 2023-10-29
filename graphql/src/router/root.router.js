const Router = require("@koa/router")
const multer = require("@koa/multer")
const {getRecentPosts} = require("../controller/root.controller")
const {uploadImage} = require("../controller/root.controller")
const router = new Router()
const upload = multer({
  dest: 'uploads/'
})
router.get("/recentposts", getRecentPosts)

router.post("/upload-image", upload.single("image"), uploadImage)

module.exports = router
