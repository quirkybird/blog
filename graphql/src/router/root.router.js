const Router = require("@koa/router")
const multer = require("@koa/multer")
const {getRecentPosts} = require("../controller/root.controller")
const {uploadImage} = require("../controller/root.controller")
const router = new Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === "image") {
      cb(null, "uploads/image")
    }
    if(file.fieldname === "markdown") {
      cb(null, "uploads/blog")
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Buffer.from(file.originalname,'binary').toString())
  }
})
const upload = multer({storage: storage})

const postUpload =  upload.fields([
  {name: "image", maxCount: 1},
  {name: "markdown", maxCount: 1}
])

router.get("/recentposts", getRecentPosts)

router.post("/upload-image", postUpload, uploadImage)

router.get("/test", (ctx, next) => {
  const data = () => {
    const userInfo = []
    for(let i = 0; i < 100000; i++) {
      userInfo.push({
        info: `这是第${i}个数字`
      })
    }
    return JSON.stringify(userInfo)
  }
  ctx.set("Content-Type", "application/json")
  ctx.body = data()
})

module.exports = router
