import {Link} from 'react-router-dom'
import { Avatar } from 'antd';
const Navigation = () => {
  const navLinks = [
    {
      title: "主页",
      path: "/",
    },
    {
      title: "博客",
      path: "/blog",
    },
    {
      title: "友链",
      path: "/friendsLinks",
    },
  ];
  return (
    <nav className="flex justify-between px-10 py-5 items-center shadow-sm">
      <span className="text-3xl font-bold">quirkybird's blog </span>
      <div className=''></div>
      <ul className="flex mr-4 font-bold items-center">
        {navLinks.map((link, index) => (
          <li className="px-8 text-lg hover:text-blue-300" key={index}>
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      <Avatar size="large" src={<img src="https://p26-passport.byteacctimg.com/img/user-avatar/27f273980e0597820475cc6fd66cf037~120x120.awebp" alt="avatar" />} />
      </ul>
    </nav>
  );
};

export default Navigation;
