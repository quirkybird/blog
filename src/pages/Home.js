import { useQuery } from "@apollo/client";
import RecentPosts from "../components/home/RecentPosts";
import { GET_RECENT_POSTS } from "../utils/queryData";
import Loading from "../components/Loading";
const Home = () => {
  
  const { data, loading } = useQuery(GET_RECENT_POSTS);
  if(loading) return <Loading />
  return (
    <main className="w-full min-h-[100vh] m-auto lg:w-[70vw] py-5">
      {data && <RecentPosts name="近期文章" posts={data.recentPost} />}
    </main>
  );
};

export default Home;
