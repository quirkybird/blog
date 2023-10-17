const rootRouter = require("./root.router")


function useRoutes(app) {
  app.use(rootRouter.routes())
}
module.exports = useRoutes
