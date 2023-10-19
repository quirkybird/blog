import { useQuery } from "@apollo/client";
import BlogList from "../components/blog/BlogList";
import {GET_ALL_POSTS} from "../utils/queryData"
const Blog = () => {
  const {data} = useQuery(GET_ALL_POSTS)
  return ( 
    <>
    <article className="w-[50vw] m-auto">
      <section>
        <h1 className="text-5xl font-black text-center py-8 tracking-wider">BLOG</h1>
        <h2 className="text-center text-xl">🎉 “代码跑起来我们再聊。” —— Ward Cunningham</h2>
        <span className="w-full h-[1px] bg-gray-300 block mt-6"></span>
      </section>
    </article>
    <article>
      <section>
        { data && <BlogList posts={data?.allPost} />}
      </section>
    </article>
    </>
   );
}
 
export default Blog;