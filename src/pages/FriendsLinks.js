import { useQuery } from "@apollo/client";
import { GET_FRIEND_LINKS } from "../utils/queryData"
const FriendsLinks = () => {
  // 获取友链数据
  const {data, error, loading} = useQuery(GET_FRIEND_LINKS)
  if(loading) return "loading"
  if(error) return error
  console.log(data.friendlinks[0])
  return (
    <main className="bg-black">
      <section className="h-screen w-full m-auto lg:w-[70vw] text-white">
        <RandomWebsite />
        <FriendCard />
      </section>
    </main>
  );
};
export const RandomWebsite = () => {
  return (
    <div className="h-1/2">
      随机开往一个地方
    </div>
  )
}
export const FriendCard = () => {
  return (
    <div className="h-1/2 m-auto bg-hole bg-contain bg-no-repeat bg-center">
      <p className="animate-spin text-center bg-white h-[50px] w-[50px] rounded-[10px]"></p>
    </div>
  )
}

export default FriendsLinks;
