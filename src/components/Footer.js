import PoweredByVercel from "powered-by-vercel";
const Footer = () => {
  return (
    <footer className="px-5 py-5 w-full shadow-[rgba(0,0,0,0.1)_0px_10px_50px]">
      <div className="lg:w-[70vw] flex justify-between items-center m-auto">
        <span>{`© ${new Date().getFullYear()} quirkybird 版权所有`}</span>
        <PoweredByVercel target="_blank" rel="noopener noreferrer" />
      </div>
    </footer>
  );
};

export default Footer;
