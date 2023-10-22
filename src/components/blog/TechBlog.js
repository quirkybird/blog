import Markdown from "react-markdown"
import remarkGfm from "remark-gfm";
const TechBlog = ({ blog }) => {
  const tempMarkStr = `
  # :rocket:博客介绍

  ## :sparkles:技术栈
  
  前端：react18，antd
  后端：koa，apollo，graphql，mysql
  
  ## :construction:功能介绍
  - [x] 富文本编辑器（支持md），方便发布文章
  - [x] 文章标签和文章分类
  - [x] 友链
  - [x] 响应式设计
  
  记录开发过程中遇到的有趣事情:   
  - 我以为RSETFUL API和GraphQL是一回事儿，GraphQL只是提供类似API查询检查的功能，使用官方提供的Playground，意味着Postman 和 Apifox这类工具无法使用，各有各的好处吧，让前端可以直接使用和后端GraphQL一样的scheme，保证传递的数据都是大家看到一样的，听说不少的公司已经在使用GrapgQL了，以后还是要多尝试，社区推行的，必将成为下一代有力的工具，另外还看见了Freme Motion,一个React动画库，之后应该会加入该库的使用，优化体验 -2023/10/17
  
  - 今天一点代码也没写 -2023/10/17
  `
  return (
    <main>
      <article className="max-w-[900px] m-auto relative">
        <section className="text-center mt-24">
          <h1 className="text-3xl">{blog.title}</h1>
          <span>发布日期: {blog.date}</span>
          <span>观看人数: </span>
        </section>
        <p>
          <Markdown remarkPlugins={[remarkGfm]}>
            {tempMarkStr}
          </Markdown>
        </p>
      </article>
    </main>
  );
};

export default TechBlog;
