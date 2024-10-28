import { Link } from 'react-router-dom';
const BlogList = ({ posts }) => {
  return (
    <ul>
      {posts.map((post, index) => (
        <li key={index} className="pb-2.5 sm:flex justify-between">
          <h1>
            <span>{'>'}</span>
            <Link to={`/blog/${post.id}`}>
              <span className="pl-5 tracking-wider hover:text-blue-300">
                {post.title}
              </span>
            </Link>
          </h1>
          <span className="pl-7 text-gray-500 shrink-0">{post.create_at}</span>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
