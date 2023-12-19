import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {GET_POST_DETAIL} from "../utils/queryData"
import TechBlog from "../components/blog/TechBlog";
import InformalBlog from "../components/blog/InformalBlog";
import Loading from "../components/common/Loading";
import Giscus from '@giscus/react';

const BlogDetail = () => {
  // 获取参数
  let {id} = useParams()
  id = parseInt(id)
  const {data, loading} =  useQuery(GET_POST_DETAIL, {
    variables: { id }
  })
  if (loading) return <Loading />;
  const post = data.post[0]
  // 设置网站标题 title
  document.title = post.title
  return ( 
    <>
      { post.categories === "tech_blog" && <TechBlog blog={post} />}
      { post.categories === "life_blog" && <InformalBlog blog={post} />}
      <Giscus
        src="https://giscus.app/client.js"
        repo="quirkybird/blog-yamorz-giscus"
        repoId="R_kgDOK7VikA"
        category="Announcements"
        categoryId="DIC_kwDOK7VikM4Cb2kU"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="zh-CN"
        loading="lazy"
        crossorigin="anonymous"
    />
    </>
   );
}
 
export default BlogDetail;