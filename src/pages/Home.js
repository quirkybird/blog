import { useQuery, gql } from "@apollo/client";
import RecentPosts from "../components/home/RecentPosts";
const Home = () => {

  const GET_RECENT_POSTS = gql`
    query getRecnetPost {
      recentPost {
        id
        author
        title
        date
        categories
        content
        descr
        tags
        link
        image

      }
    }
  `;
  const { data } = useQuery(GET_RECENT_POSTS);
  console.log(data)
  return (
    <main className="w-full m-auto lg:w-[70vw]">
      {data && <RecentPosts name="近期文章" posts={data.recentPost} />}
    </main>
  );
};

export default Home;
