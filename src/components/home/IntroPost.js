import {Link} from 'react-router-dom'
import Tags from '../Tags'
const IntroPost = ({post}) => {
  return ( 
    <section>
      {
        <div className="post-intro-card px-5 pt-5">
          <div className="w-full">
          <img className='rounded-md' src={require(`../../assets/images/${post.image}`)} alt={post.title} />
          </div>
          <div><Tags tags={JSON.parse(post.tags.toLowerCase())} /></div>
          <h2  className='text-xl font-bold'>{post.title}</h2>
          <div className='text-sm text-gray-500 font-semibold py-4'> 
            <span>作者: {post.author}</span>
            <span>  -{post.date}</span>
          </div>
          <p className='text-base font-semibold mb-4'>{post.desc}</p>
          <span className='text-blue-400'> 
            <Link to={post.link}>{">阅读全文"}</Link>
          </span>
        </div>
      }
    </section>
   );
}
 
export default IntroPost;