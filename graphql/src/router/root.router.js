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

module.exports = router
