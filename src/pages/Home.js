import { useQuery } from "@apollo/client";
import RecentPosts from "../components/home/RecentPosts";
import { GET_RECENT_POSTS } from "../utils/queryData";
import Loading from "../components/common/Loading";
import Profile from "../components/home/Profile";
import ConcatMe from "../components/home/ConcatMe";
const Home = () => {
  // 获取数据
  const { data, loading } = useQuery(GET_RECENT_POSTS);
  if(loading) return <Loading />
  return (
    <main className="w-full min-h-[100vh] m-auto lg:w-[70vw] py-5">
     <ConcatMe />
      <Profile />
      {data || <h1>很遗憾，数据跑丢了，下次再来</h1>}
      {data && <RecentPosts name="近期文章" posts={data.recentPost} />}
    </main>
  );
};

export default Home;
