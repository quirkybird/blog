import { Link } from "react-router-dom";
const BlogList = ({ posts }) => {
  return (
    <section className="pt-6">
      {posts.map((post, index) => (
        <div key={index} className="flex justify-between py-2.5 px-[calc(25%)]">
          <span>
            {">"}
            <Link to={`/blog/${post.id}`}>
              <span className="pl-5 tracking-wider hover:text-blue-300">
                {post.title}
              </span>
            </Link>
          </span>
          <span>{post.date}</span>
        </div>
      ))}
    </section>
  );
};

export default BlogList;
