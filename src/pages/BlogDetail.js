import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {GET_POST_DETAIL} from "../utils/queryData"
import TechBlog from "../components/blog/TechBlog";
import InformalBlog from "../components/blog/InformalBlog";

const BlogDetail = () => {
  let {id} = useParams()
  id = parseInt(id)
  const {data, loading} =  useQuery(GET_POST_DETAIL, {
    variables: { id }
  })
  const post = data?.post[0]
  if (loading) return <div>Loading...</div>;
  return ( 
    <>
      { post.categories === "tech_blog" && <TechBlog blog={post} />}
      { post.categories === "life_blog" && <InformalBlog blog={post} />}
    </>
   );
}
 
export default BlogDetail;