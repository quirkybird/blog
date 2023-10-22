import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {GET_POST_DETAIL} from "../utils/queryData"
import TechBlog from "../components/blog/TechBlog";

const BlogDetail = () => {
  let {id} = useParams()
  id = parseInt(id)
  const {data, loading} =  useQuery(GET_POST_DETAIL, {
    variables: { id }
  })
  const post = data?.post[0]
  if (loading) return <div>Loading...</div>;
  return ( 
    <TechBlog blog={post} />
   );
}
 
export default BlogDetail;