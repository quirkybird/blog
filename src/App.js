import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
// 导入用户设备检测函数
import deviceTest from "./utils/deviceTest";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
// 桌面端的友链
import FriendsLinksDesktop from "./pages/FriendsLinksDesktop";
// 移动端的友链
import FriendsLinksPhone from "./pages/FriendsLinksPhone";
import NotFound from "./pages/NotFound";
import QbMusic from "./pages/Music";
import BlogDetail from "./pages/BlogDetail";
import NewBlog from "./pages/NewBlog";
import Footer from "./components/Footer";
function App() {
  let boo_user = undefined
  const deviceType = deviceTest()
  if(deviceType === "mobile") boo_user = true
  if(deviceType === "desktop") boo_user = false
  return (
    <Router>
      <div className="App">
        <Navigation />
        {/* 填充物 */}
        <div className="w-full h-[68.35px] lg:h-[76px]"></div>
        <Routes>
          <Route path="/" exact element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          {/* 根据设备类型来加载组件 */}
          <Route path="/friendsLinks" element={boo_user ? <FriendsLinksPhone /> : <FriendsLinksDesktop />} />
          <Route path="/qbmusic" element={<QbMusic />} />
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
  const handleBackHead = () => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
  }
  return ( 
    <aside onClick={handleBackHead} className="fixed right-7 bottom-7 p-2 rounded-md hover:cursor-pointer bg-gray-200">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </aside>
   );
}
 

export default App;
