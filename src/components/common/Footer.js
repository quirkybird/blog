import PoweredByVercel from "powered-by-vercel";
const Footer = () => {
  return (
    <footer className="p-5 w-full shadow-[rgba(0,0,0,0.1)_0px_10px_50px]">
      <div className="lg:w-[70vw] flex sm:justify-between justify-center flex-wrap items-center m-auto">
        <div className="flex items-center text-[12px] lg:text-base">
          <div className="whitespace-nowarp shrink-0">{`© ${new Date().getFullYear()} quirkybird 版权所有`}
          </div>
          <div className="flex lg:ml-5 ml-3 items-center">
              <img className="w-8" src={require("../../assets/images/icon120.png")} alt="萌国icon" />
              <a href="https://icp.gov.moe/?keyword=20236776" target="_blank" rel="noopener noreferrer">萌ICP备20236776号</a>
          </div>
        </div>
        <div className="self-end p-2">
          <PoweredByVercel target="_blank" rel="noopener noreferrer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;


