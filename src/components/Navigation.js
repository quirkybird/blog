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
    <div className="navigation">
      <h1 className="font-20">quirkybird</h1>
      {navLinks.map((link, index) => (
        <li key={index}>{link.title}</li>
      ))}
    </div>
  );
};

export default Navigation;
