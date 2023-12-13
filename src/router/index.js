import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import deviceTest from "../utils/deviceTest";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
// 桌面端的友链
import FriendsLinksDesktop from "../pages/FriendsLinksDesktop";
// 移动端的友链
import FriendsLinksPhone from "../pages/FriendsLinksPhone";
import MessageStack from "../pages/MessageStack";
import NotFound from "../pages/NotFound";
import QbMusic from "../pages/Music";
import BlogDetail from "../pages/BlogDetail";
import NewBlog from "../pages/NewBlog";

// 用户设备判断
let boo_user = null;
const deviceType = deviceTest();
if (deviceType === "mobile") boo_user = true;
if (deviceType === "desktop") boo_user = false;

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/home" /> }, // 设置 index 属性来重定向到 /home
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "blog",
        element: <Blog />,
        children: [
          {
            path: ":id",
            element: <BlogDetail />,
          },
        ],
      },
      {
        path: "friendsLinks",
        element: boo_user ? <FriendsLinksPhone /> : <FriendsLinksDesktop />,
      },
      {
        path: "qbmusic",
        element: <QbMusic />,
      },
      {
        path: "messagestack",
        element: <MessageStack />,
      },
      {
        path: "injectnewblog",
        element: <NewBlog />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
