import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
// 导入用户设备检测函数
import deviceTest from "../utils/deviceTest";
const Home = lazy(() => import("../pages/Home"));
const Blog = lazy(() => import("../pages/Blog"));
// 桌面端的友链
const FriendsLinksDesktop = lazy(() => import("../pages/FriendsLinksDesktop"));
// 移动端的友链
const FriendsLinksPhone = lazy(() => import("../pages/FriendsLinksPhone"));
const MessageStack = lazy(() => import("../pages/MessageStack"));
const NotFound = lazy(() => import("../pages/NotFound"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const NewBlog = lazy(() => import("../pages/NewBlog"));

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
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "friendsLinks",
        element: boo_user ? <FriendsLinksPhone /> : <FriendsLinksDesktop />,
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
