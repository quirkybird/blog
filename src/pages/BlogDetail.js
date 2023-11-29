import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {GET_POST_DETAIL} from "../utils/queryData"
import TechBlog from "../components/blog/TechBlog";
import InformalBlog from "../components/blog/InformalBlog";
import Loading from "../components/Loading";

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
    </>
   );
}
 
export default BlogDetail;