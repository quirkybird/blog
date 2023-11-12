import { useQuery } from "@apollo/client";
import BlogList from "../components/blog/BlogList";
import {GET_ALL_POSTS} from "../utils/queryData"
const Blog = () => {
  const {data} = useQuery(GET_ALL_POSTS)
  return ( 
    <article className="sm:w-[620px] h-[calc(100vh-80px)] p-5 m-auto">
      <section>
        <h1 className="text-5xl font-black text-center py-8 tracking-wider">BLOG</h1>
        <p className="text-center text-xl">🎉 “代码跑起来我们再聊。” —— Ward Cunningham</p>
        <span className="inline-block w-full h-[1px] bg-gray-300 my-8"></span>
      </section>
      <section>
        { data && <BlogList posts={data?.allPost} />}
      </section>
    </article>
   );
}
 
export default Blog;