import { useMemo, useState } from "react";
import { Pagination } from "antd";
import IntroPost from "./IntroPost";

const RencentPosts = ({name, posts}) => {
  const [pageSize] = useState(6)
  const [current, setCurrent] = useState(1)
  // 设置换页滚动到顶部
  window.scrollTo(0, 0)
  const paginatedPosts = useMemo(() => {
    const lastIndex = current * pageSize
    const firstIndex = lastIndex - pageSize
    return posts.slice(firstIndex, lastIndex)
  }, [current, pageSize, posts])

  return ( 
    <article>
    <h2 className="text-2xl pt-10 px-5">{name}</h2>
    <div className="lg:flex flex-wrap justify-between">
      {paginatedPosts.map((post) => (
          <div key={post.id} className="lg:w-1/3">
              <IntroPost post={post} />
          </div>
        ))}
    </div>
    <section className="my-4">
      <Pagination 
        simple 
        pageSize={pageSize}
        defaultCurrent={current}
        total={posts.length}
        onChange={setCurrent}
       />
    </section>
    </article>
   );
}
 
export default RencentPosts;