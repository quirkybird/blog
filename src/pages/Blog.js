import { useQuery } from '@apollo/client';
import BlogList from '../components/blog/BlogList';
import { GET_ALL_POSTS } from '../utils/queryData';
import Loading from '../components/common/Loading';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../req/request';
/**
 * 博客
 */
const Blog = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  // const { data, loading } = useQuery(GET_ALL_POSTS);
  // const data = req.allPost();
  // console.log('---alldataalldata', data);

  useEffect(() => {
    getAllPosts()
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <article className="sm:w-[620px] min-h-[calc(100vh-80px)] p-5 m-auto">
      <section>
        <h1 className="lg:text-5xl text-3xl font-black text-center py-8 tracking-wider">
          BLOG
        </h1>
        <p className="text-center lg:text-xl">
          🎉 “代码跑起来我们再聊。” —— Ward Cunningham
        </p>
        <span className="inline-block w-full h-[1px] bg-gray-300 my-8"></span>
      </section>
      <section>{data && <BlogList posts={data?.article} />}</section>
    </article>
  );
};

export default Blog;
