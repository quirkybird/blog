/* eslint-disable react-hooks/exhaustive-deps */
import PoweredByVercel from "powered-by-vercel";
import { useEffect, useRef, useState, useContext, startTransition } from "react";
import { ThemeContext } from "../../App";
const Footer = () => {
  return (
    <footer className="p-5 w-full shadow-[rgba(0,0,0,0.1)_0px_10px_50px]">
      <div className="lg:w-[70vw] flex sm:justify-between justify-center flex-wrap items-center m-auto">
        <div className="flex items-center text-[12px] lg:text-base">
          <div className="whitespace-nowarp shrink-0">{`© ${new Date().getFullYear()} quirkybird 版权所有`}
          </div>
          <div className="flex lg:ml-5 ml-3 items-center">
              <img className="w-8" src={require("../../assets/images/icon120.png")} alt="萌国icon" />
              <a href="https://icp.gov.moe/?keyword=20236776" target="_blank" rel="noopener noreferrer">萌ICP备20236776号</a>
          </div>
        </div>
        <div className="self-end p-2 flex items-center">
          <ThemeButton />
          <PoweredByVercel target="_blank" rel="noopener noreferrer" />
        </div>
      </div>
    </footer>
  );
};

export const ThemeButton = () => {
  const containerRef = useRef(null)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || null)

  // 创建接受上下文的useContext
  const setThemeMode = useContext(ThemeContext)

  useEffect(() => {
    const container = containerRef.current
    // 去除所有样式
    for(const ele of container.children) {
      ele.style.color = "inherit"
    }
    switch(theme) {
      case "light": container.children[0].style.color = "#60A5FA"; break;
      case "dark": container.children[1].style.color = "#60A5FA"; break;
      case null: container.children[2].style.color = "#60A5FA"; break;
      default: container.children[0].style.color = "#60A5FA"
    }
    const handleClick = (e) => {
      // if(e.target.tagName !== "SPAN") return
      //closest 匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配小于，则返回null。
      const btn = e.target.closest('span')
      const btnThemeId = btn.dataset.themeId
      if(!btn) return
      // 调用函数
      themeSwitch[btnThemeId]()
    }
    container.addEventListener("click", handleClick)

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      startTransition(() => {
        document.documentElement.style.filter = 'brightness(85%)'
        setThemeMode("dark")
      })
    } else {
      document.documentElement.classList.remove('dark')
      startTransition(() => {
        document.documentElement.style.filter = ''
        setThemeMode("light")
      })
    }

    return () => {
      container.removeEventListener("click", handleClick)
    }
  }, [theme])

  const themeSwitch = {
      // 明亮
      themeLight: () => {
        localStorage.setItem('theme', 'light')
        setTheme("light")
      },
      // 黑暗
      themeDark: () => {
        localStorage.setItem('theme', 'dark')
        setTheme("dark")
      },
      // 跟随系统
      themeOs: () => {
        localStorage.removeItem('theme')
        setTheme(null)
      }
  }
  return (
    <div ref={containerRef} className="w-24 h-9 mx-5 outline-1 outline rounded-md flex items-center">
      <span className="flex-1 inline-block pl-1 cursor-pointer" data-theme-id="themeLight">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>
      </span>
      <span className="flex-1 cursor-pointer" data-theme-id="themeDark">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>
      </span>
      <span className="flex-1 inline-block pr-1 cursor-pointer" data-theme-id="themeOs">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z"/></svg>
      </span>
    </div>
  )
}

export default Footer;


