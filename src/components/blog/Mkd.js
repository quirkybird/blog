import { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import hljs from "highlight.js/lib/common";
// 引入markdown中代码显示样式，通过highlight.js实现
import "highlight.js/styles/stackoverflow-light.css";

const Mkd = ({ markdown }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <section className="prose max-w-none p-5 prose-img:block 
    prose-img:m-auto prose-h2:text-[16px] prose-pre:bg-[#F6F6F6] 
    lg:prose-pre:text-[18px] prose-pre:text-[13px]">
      <Markdown remarkPlugins={[remarkGfm, emoji]}>{markdown}</Markdown>
    </section>
  );
};

export default Mkd;
