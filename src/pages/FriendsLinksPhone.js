import { useQuery } from "@apollo/client";
import { GET_FRIEND_LINKS } from "../utils/queryData";
import Loading from "../components/common/Loading";
const FriendsLinksPhone = () => {
  const { data, error, loading } = useQuery(GET_FRIEND_LINKS);
  if (loading) return <Loading />;
  if (error) return error;

  const friendLinks = data.friendlinks
  return ( 
    <main>
      <p className="text-lg">👋 遇见更多的人</p>
      {friendLinks.map((friendLink, index) => (
        <InfoCard key={index} link={friendLink}/> 
      ))}
    </main>
   );
}

export const InfoCard = ({link}) => {
  const boxShadow =  `shadow-[5px_5px_50px_15px_var(--color)]`;
  return ( 
    <div style = {{ '--color': link.theme_color }}
      className= {`${boxShadow} my-10 rounded-md mx-5 animate__animated animate__jackInTheBox animate__delay-1s`}>
      <a href={link.website_link} target="noreferrer" 
      className="h-40 rounded-md shadow-xl text-center flex flex-col justify-evenly items-center"
      style={{background: link.theme_color}}>
      <img src={link.website_cover} alt="网站图片" className="w-[46px] rounded-md" />
      <div>
        <span className="text-xl font-extralight">{link.website_title}</span>
        <p className="text-sm pt-3">{link.website_desr}</p>
      </div>
      </a>
    </div>
   );
}

export default FriendsLinksPhone;