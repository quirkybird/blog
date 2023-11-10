import { useQuery } from "@apollo/client";
import { GET_FRIEND_LINKS } from "../utils/queryData";
import { useEffect, useRef, useState, memo } from "react";
import getRandomNumber from "../utils/random"
import ufo from "../assets/icon/ufo.svg"
const FriendsLinks = () => {
  // 获取友链数据
  const { data, error, loading } = useQuery(GET_FRIEND_LINKS);
  if (loading) return "loading";
  if (error) return error;

  // 随机友链
  const randomNumber = getRandomNumber(0, data.friendlinks.length - 1)
  const friendlink = data.friendlinks[randomNumber];
  // 定义主题颜色
  const themeColor = friendlink.theme_color
  // 所有数据
  const friendlinks = data.friendlinks;
  return (
    <main className="bg-black">
      <section className="w-full m-auto lg:w-[70vw] text-white">
        <RandomWebsite friendlink = {friendlink} themeColor = {themeColor} />
        <FriendCard friendlinks = {friendlinks} />
      </section>
    </main>
  );
};
// 随机网站
export const RandomWebsite = ({friendlink}) => {
  const randomwebRef = useRef(null);
  const infoCardRef = useRef(null)
  const [isUfoShow, setIsUfoShow] = useState(false)
  useEffect(() => {
    const randomweb = randomwebRef.current;
    // 滚动到指定位置
    randomweb.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

  }, []);

  const hanleEmitBtn = (e) => {
    setIsUfoShow(!isUfoShow)
    // 延迟加载动画
    const infoCard = infoCardRef.current
    if(infoCard) {
      setTimeout(() => {
        // 让卡片上移50%
        infoCard.style.bottom = "50%"
        infoCard.style.transform = "translate(-50%, 80%)"
        // 消除ufo
        // setIsUfoShow(!isUfoShow)
      }, 7000);
    }
  }
  return (
    <div className="random-web h-[500px] relative mb-10 pt-10" ref={randomwebRef}>
      <span className="text-lg">🌏 随机进入一个坐标</span>
      <div className="flex justify-center items-center">
        <p className="animate-typeing overflow-hidden whitespace-nowrap 
        text-center text-2xl font-[600] border-r-2">来自时光隧道的神秘坐标即将出现🌌</p>
      </div>
      <div className="flex justify-center">
        {isUfoShow && 
        ( <div className="ufo animate-ufo -translate-y-[200px]">
            <img src={ufo} alt="ufo" className="z-10 relative" />
            <div className="w-[180px] h-[42px] bg-[#4ade80] m-auto -translate-y-[85px]"></div>
            <div
            className="-translate-y-[120px] animate-ufo-light z-0 opacity-0" 
            style=
            {{
            'width': "0",
            'height': "0",
            'borderLeft': "120px solid transparent", 
            'borderRight': "120px solid transparent",
            'borderBottom': "240px solid #86efac",
            'boxShadow': `rgba(33, 35, 38, 0.1) 0px 10px 10px -10px`,
            'borderRadius': "50%",
            }}></div>
          </div>
        )}
        {
         isUfoShow || <div className="btn-grad absolute bottom-1/3" onClick={hanleEmitBtn}>接收信号</div>
        }
      </div> 
      <div ref={infoCardRef} className="absolute bottom-0 -translate-x-1/2 left-1/2 transition-all duration-500">
          { isUfoShow &&  <InfoCard link = {friendlink} />}
      </div>
    </div>
  );
};
// 所有友链情况
export const FriendCard = ({friendlinks}) => {

  // 给每个星球添加鼠标事件
  const starCenterRef = useRef(null)
  const [starInfo, setStarInfo] = useState(null)
  useEffect(() => {
    const starCenter = starCenterRef.current
    // 获取星球元素（这里获取子组件的元素，按照react自顶向下的渲染方式，可以这样做）
    const stars = document.querySelectorAll('.star')
    const onMouseenter = (star, index) => {
      star.style.top = "302.6px"
      star.style.left = "50%"
      star.style.opacity = 0
      star.style.zIndex = -1
      starCenter.style.filter = "blur(0)"
      setStarInfo(friendlinks[index])
    }
    // 监听鼠标进入
    stars.forEach((star, index) => {
      star.addEventListener("mouseenter",() => {onMouseenter(star, index)})
    })
    return () => {
      if(stars) {
        stars.forEach((star, index) => {
          star.removeEventListener("mouseenter", () => {onMouseenter(star, index)})
        })
      }
    }
  }, [friendlinks])
  return (
    <div>
      <p className="text-lg">👋 遇见更多的人</p>
      {/* 这里设置故意让其超出包含块所在的元素，达到预期定位效果 */}
      <ul className="relative">
      {friendlinks.map((friendlink, index) => (
         <Stars key={index} friendlink = {friendlink} />
      )
      )}
      </ul>
      <div className="w-full h-[635px] m-auto rounded-[50%] relative flex justify-center items-center">
        <div className="animate-wave-slow w-[250px] h-[250px] rounded-[50%] outline-5 outline absolute" style={{outlineColor: starInfo?.theme_color}}></div>
        <div className="animate-wave-fast w-[200px] h-[200px] rounded-[50%] outline-5 outline absolute" style={{outlineColor: starInfo?.theme_color}}></div>
        <div className="animate-wave-slow w-[100px] h-[100px] rounded-[50%] outline-5 outline absolute" style={{outlineColor: starInfo?.theme_color}}></div>
        <div ref={starCenterRef} className=" w-[300px] h-[300px] rounded-[50%] bg-purple-400 absolute blur">
          <a href={ starInfo?.website_link } className="relative">
            <img className="w-full rounded-[50%]" src={starInfo?.website_cover} alt="" />
            <div className="w-3/4 text-xl text-center absolute top-[20%] left-1/2 -translate-x-1/2">{ starInfo?.website_title }</div>
            <div className="absolute text-center top-1/2">{ starInfo?.website_desr }</div>
          </a>
        </div>
      </div>
    </div>
  );
};
// 友链信息卡片
export const InfoCard = ({link}) => {
  const themeColor = link.theme_color
  const [hoverShadow, setHoverShadow] = useState({})
  const handleMouseenter = () => {
    // 设置阴影
    setHoverShadow({boxShadow: `5px 5px 50px 15px ${themeColor}`})
  }
  const handleMouseleave = () => {
    setHoverShadow({})
  }
  return ( 
    <div onMouseEnter = {handleMouseenter} onMouseLeave = {handleMouseleave} style={hoverShadow}
      className= "mx-10 animate__animated animate__jackInTheBox animate__delay-5s inline-block">
      <a href={link.website_link} target="noreferrer" className="w-[360px] h-[180px]
      rounded-md shadow-xl text-center flex flex-col justify-evenly items-center" style={{background: link.theme_color}}>
      <img src={link.website_cover} alt="网站图片" className="w-[46px] rounded-md" />
      <div>
        <span className="text-xl font-extralight">{link.website_title}</span>
        <p className="text-sm pt-3">{link.website_desr}</p>
      </div>
      </a>
    </div>
   );
}
 
// 使用memo API保证在父组件重新渲染时不重新渲染
export const Stars = memo(({friendlink}) => {
  // 随机友链坐标
  const getRandomCoordinate = () => {
    const screenW = window.innerWidth
    const x = getRandomNumber(100, screenW * 0.7-100, [(screenW * 0.7 - 300) / 2, (screenW * 0.7 - 300) / 2 + 300])
    const y = getRandomNumber(100, 535, [160, 460])
    return {
      left:  x +'px',
      top: y +'px'
    }
  }
  const {top, left} = getRandomCoordinate()

  return ( 
    <a href={friendlink.website_link} className="star block w-[30px] h-[30px] rounded-[50%] bg-purple-300 absolute z-10
        drop-shadow-[0_0_25px_#c084fc] blur-none outline-dotted outline-offset-4 transition-all duration-500" 
        style={{left: left, top: top, outlineColor: friendlink.theme_color, filter: `drop-shadow(0 0 25px ${friendlink.theme_color})`}}>
        <img src={friendlink.website_cover} alt="cover" className="rounded-[50%]"/>
    </a>
   );
})
 


export default FriendsLinks;
