import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {GET_POST_DETAIL} from "../utils/queryData"

const BlogDetail = () => {
  let {id} = useParams()
  id = parseInt(id)
  const {data} =  useQuery(GET_POST_DETAIL, {
    variables: { id }
  })
  const post = data?.post[0]
  console.log(post)
  return ( 
    <main>
      <h1>{post?.title}</h1>
      <section>{post?.date}</section>
      <p>{post?.content}</p>
    </main>
   );
}
 
export default BlogDetail;