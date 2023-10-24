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
    <section className="tracking-wider prose prose-lg max-w-none p-10 prose-h2:text-[20px] prose-pre:bg-[#F6F6F6] prose-code:text-lg prose-code:font-bold">
      <Markdown remarkPlugins={[remarkGfm, emoji]}>{markdown}</Markdown>
    </section>
  );
};

export default Mkd;
