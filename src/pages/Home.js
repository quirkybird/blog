import recentPost from "../mock/recentPost";
import RecentPosts from "../components/home/RecentPosts";
const Home = () => {
  return (
    <main className="w-full m-auto lg:w-[70vw]">
        <RecentPosts name="近期文章" posts={recentPost} />
    </main>
  );
};

export default Home;
