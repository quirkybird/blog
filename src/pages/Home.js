import { useQuery } from "@apollo/client";
import RecentPosts from "../components/home/RecentPosts";
import { GET_RECENT_POSTS } from "../utils/queryData";
const Home = () => {
  
  const { data } = useQuery(GET_RECENT_POSTS);
  return (
    <main className="w-full m-auto lg:w-[70vw] py-5">
      {data && <RecentPosts name="近期文章" posts={data.recentPost} />}
    </main>
  );
};

export default Home;
