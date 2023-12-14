import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom"
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import usePageView from "./hooks/usePageView"
function App() {
  // 插入页面浏览数埋点
  usePageView()
  return (
      <div className="App dark:bg-[--bg-dark-theme-color] dark:text-[#fafafa]">
        <Navigation />
        {/* 填充物 */}
        <div className="w-full h-[68.35px] lg:h-[80px]"></div>
        <Outlet />
        {/* 添加返回顶部按钮 */}
        <BackTop />
        {/* 添加页脚  */}
        <Footer />
      </div>
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
