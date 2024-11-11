import { useQuery } from '@apollo/client';
import RecentPosts from '../components/home/RecentPosts';
import { GET_RECENT_POSTS } from '../utils/queryData';
import Loading from '../components/common/Loading';
import Profile from '../components/home/Profile';
import ConcatMe from '../components/home/ConcatMe';
import { useState, useEffect } from 'react';
import { getAllPosts } from '../req/request';
import { Alert } from 'antd';
const Home = () => {
  // 获取数据
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
    <main className="w-full min-h-[100vh] m-auto lg:w-[70vw] py-5">
      <ConcatMe />
      <Profile />
      {/* 临时修复提示 */}
      <Alert
        message="由于VPS服务器机房所在大楼失火，停电导致了数据丢失，让作者十分气愤😡😡，同时让我思考不备份带来的后果，不过我正在以一种新的方式重构站点yamorz，不久后就将修复🛠️🛠️🛠️&emsp;——2024/10/28
        "
        type="info"
      />
      <Alert
        message="
        博客文章浏览基本恢复 ——11.11"
        type="info"
      />
      {data && <RecentPosts name="近期文章" posts={data.article} />}
    </main>
  );
};

export default Home;
