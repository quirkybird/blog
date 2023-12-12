import { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
// 导入用户设备检测函数
import deviceTest from "./utils/deviceTest";
import Navigation from "./components/common/Navigation";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
// 桌面端的友链
import FriendsLinksDesktop from "./pages/FriendsLinksDesktop";
// 移动端的友链
import FriendsLinksPhone from "./pages/FriendsLinksPhone";
import MessageStack from "./pages/MessageStack"
import NotFound from "./pages/NotFound";
import QbMusic from "./pages/Music";
import BlogDetail from "./pages/BlogDetail";
import NewBlog from "./pages/NewBlog";
import Footer from "./components/common/Footer";
import RouterTracking from "./hooks/RouterTracking";
function App() {
  // 用户设备
  let boo_user = null
  const deviceType = deviceTest()
  if(deviceType === "mobile") boo_user = true
  if(deviceType === "desktop") boo_user = false
  return (
    <Router>
      <div className="App">
        <RouterTracking />
        <Navigation />
        {/* 填充物 */}
        <div className="w-full h-[68.35px] lg:h-[80px]"></div>
        <Routes>
          <Route path="/" exact element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          {/* 根据设备类型来加载组件 */}
          <Route path="/friendsLinks" element={boo_user ? <FriendsLinksPhone /> : <FriendsLinksDesktop />} />
          <Route path="/qbmusic" element={<QbMusic />} />
          <Route path="/messagestack" element={<MessageStack />} />
          <Route path="/injectnewblog" element={<NewBlog />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* 添加返回顶部按钮 */}
        <BackTop />
        {/* 添加页脚  */}
        <Footer />
      </div>
    </Router>
  );
}

export const BackTop = () => {
  const backtopRef = useRef(null)
  const handleBackHead = () => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
  }
  useEffect(() => {
    const handleScroll = () => {
      if(document.documentElement.scrollTop >= 80) {
        backtopRef.current.style.opacity = 1
      } else {
        backtopRef.current.style.opacity = 0
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })
  return ( 
    <aside ref={backtopRef} onClick={handleBackHead} className="fixed right-7 bottom-7 p-2 rounded-md hover:cursor-pointer bg-gray-200 transition-opacity opacity-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </aside>
   );
}
 

export default App;
