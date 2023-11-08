import { useQuery } from "@apollo/client";
import { GET_FRIEND_LINKS } from "../utils/queryData";
import { useEffect, useRef, useState } from "react";
import ufo from "../assets/icon/ufo.svg"
const FriendsLinks = () => {
  // 获取友链数据
  const { data, error, loading } = useQuery(GET_FRIEND_LINKS);
  if (loading) return "loading";
  if (error) return error;
  const friendlink = data.friendlinks[0];
  const friendlinks = data.friendlinks;
  return (
    <main className="bg-black overflow-auto">
      <section className="w-full h-[calc(100vh-80px)] m-auto lg:w-[70vw] text-white">
        <RandomWebsite friendlink = {friendlink}/>
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
    <div className="random-web h-4/5 relative mb-10 pt-10" ref={randomwebRef}>
      <span>随机进入一个坐标</span>
      <div className="flex justify-center items-center">
        <p className="animate-typeing overflow-hidden whitespace-nowrap 
        text-center text-2xl font-[500] border-r-2">来自时光隧道的神秘坐标即将出现🌌</p>
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
         isUfoShow || <div className="btn-grad absolute bottom-1/2" onClick={hanleEmitBtn}>接收信号</div>
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
  // 随机友链坐标
  const getRandomCoordinate = () => {
    const x = getRandomNumber(100, 700, [250, 550])
    const y = getRandomNumber(100, 700, [250, 550])
    return {
      left:  x +'px',
      top: y +'px'
    }
  }
  // 获得固定闭区间随机数
  const getRandomNumber = (min, max, excludedRange) => {
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1) + min)
    } while (num >= excludedRange[0] && num <= excludedRange[1]);
    return num;
  }
  return (
    <div>
      <p>遇见更多的人</p>
      {/* 这里设置故意让其超出包含块所在的元素，达到预期定位效果 */}
      <ul className="relative">
      {friendlinks.map((friendlink, index) => {
        const {top, left} = getRandomCoordinate()
        return <a href="JavaScript:;" key={index} className="block w-[30px] h-[30px] rounded-[50%] bg-purple-300 absolute z-10
        drop-shadow-[0_0_25px_#d8b4fe] blur-none" style={{left: left, top: top}}></a>
      }
      )}
      </ul>
      <div className="lg:w-[800px] lg:h-[800px] w-[300px] h-[300px] m-auto rounded-[50%] relative flex justify-center items-center">
        <div className="animate-wave-slow w-[250px] h-[250px] rounded-[50%] outline-5 outline-purple-300 outline absolute"></div>
        <div className="animate-wave-fast w-[200px] h-[200px] rounded-[50%] outline-5 outline-purple-300 outline absolute"></div>
        <div className="animate-wave-slow w-[100px] h-[100px] rounded-[50%] outline-5 outline-purple-300 outline absolute"></div>
        <div className="animate-breathe w-[300px] h-[300px] rounded-[50%] bg-purple-400 absolute blur"></div>
      </div>
    </div>
  );
};
// 友链信息卡片
export const InfoCard = ({link}) => {
  return ( 
    <div className="mx-10 hover:shadow-[5px_5px_50px_15px_#a3e635]
      animate__animated animate__jackInTheBox animate__delay-5s inline-block">
      <a href={link.website_link} target="_blank" className="w-[360px] h-[180px] bg-[#a3e635] 
      rounded-md shadow-xl text-center flex flex-col justify-evenly items-center">
      <img src={link.website_cover} alt="网站图片" className="w-[46px] rounded-md" />
      <div>
        <span className="text-xl font-extralight">{link.website_title}</span>
        <p className="text-sm pt-3">{link.website_desr}</p>
      </div>
      </a>
    </div>
   );
}
 


export default FriendsLinks;
