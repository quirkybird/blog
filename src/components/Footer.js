import PoweredByVercel from "powered-by-vercel";
const Footer = () => {
  return (
    <footer className="p-5 w-full shadow-[rgba(0,0,0,0.1)_0px_10px_50px] ">
      <div className="lg:w-[70vw] flex sm:justify-between justify-center flex-wrap items-center m-auto">
        <span className="whitespace-nowarp shrink-0">{`© ${new Date().getFullYear()} quirkybird 版权所有`}</span>
        <div className="self-end p-1">
          <PoweredByVercel target="_blank" rel="noopener noreferrer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;


