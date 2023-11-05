import { useQuery } from "@apollo/client";
import { GET_FRIEND_LINKS } from "../utils/queryData";
import { useEffect, useRef, useState } from "react";
import ufo from "../assets/icon/ufo.svg"
const FriendsLinks = () => {
  // 获取友链数据
  const { data, error, loading } = useQuery(GET_FRIEND_LINKS);
  if (loading) return "loading";
  if (error) return error;
  const friendlinks = data.friendlinks[0];
  return (
    <main className="bg-black overflow-auto">
      <section className="w-full h-[calc(100vh-80px)] m-auto lg:w-[70vw] text-white">
        <RandomWebsite friendlinks = {friendlinks}/>
        <FriendCard />
      </section>
    </main>
  );
};
export const RandomWebsite = ({friendlinks}) => {
  const randomwebRef = useRef(null);
  const [isUfoShow, setIsUfoShow] = useState(false)
  useEffect(() => {
    const randomweb = randomwebRef.current;
    randomweb.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

  }, []);

  const hanleEmitBtn = (e) => {
    setIsUfoShow(!isUfoShow)
  }
  return (
    <div className="random-web h-4/5 relative mb-10" ref={randomwebRef}>
      <span>随机进入一个坐标</span>
      <div className="flex justify-center">
        {isUfoShow && 
        ( <div className="ufo animate-ufo -translate-y-[200px]">
          <img src={ufo} alt="ufo" />
          </div>
        )}
        {
         isUfoShow || <div className="btn-grad absolute bottom-0" onClick={hanleEmitBtn}>发射一下</div>
        }
      </div>
      <div className="absolute bottom-0 -translate-x-1/2 left-1/2">
        {isUfoShow && <InfoCard friendlinks = {friendlinks}/>}
      </div>
    </div>
  );
};
export const FriendCard = () => {
  return (
    <div className="h-1/2 bg-hole bg-contain bg-no-repeat bg-center">
      <span>遇见更多的人</span>
      <p className="animate-black-hole text-center bg-white h-[50px] w-[50px] rounded-[10px] text-black">7</p>
    </div>
  );
};

export const InfoCard = ({friendlinks}) => {
  return ( 
    <div>
      <a href={friendlinks.website_link} className="w-[360px] h-[180px] bg-pink-300 rounded-md shadow-xl text-center flex flex-col justify-evenly items-center">
      <img src={friendlinks.website_cover} alt="网站图片" className="w-[64px] rounded-md" />
      <div>
        <span className="text-xl font-extralight">{friendlinks.website_title}</span>
        <p className="text-sm pt-3">{friendlinks.website_desr}</p>
      </div>
      </a>
    </div>
   );
}
 


export default FriendsLinks;
