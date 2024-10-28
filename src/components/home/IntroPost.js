import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tags from '../common/Tags';
// import formDate from '../../utils/formatDate';
import createObserver from '../../utils/lazyLoadingImg';
const IntroPost = ({ post }) => {
  useEffect(() => {
    // 执行交叉观察代码
    createObserver();
  });
  return (
    <section>
      <div className="post-intro-card px-5 pt-5">
        <div className="w-full">
          <img
            className="rounded-md"
            data-src={`${post.image}`}
            alt={post.title}
          />
        </div>
        <div className="p-1 m-1.5 ml-0">
          {/* <Tags tags={JSON.parse(post.tags)} /> */}
        </div>
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <div className="text-sm text-gray-500 font-light py-4">
          <span>作者: {post.author}</span>
          <span> -{post.create_at}</span>
        </div>
        <p className="text-base font-normal mb-4">{post.descr}</p>
        <span className="text-blue-400">
          <Link to={`/blog/${post.id}`}>{'>阅读全文'}</Link>
        </span>
      </div>
    </section>
  );
};

export default IntroPost;
