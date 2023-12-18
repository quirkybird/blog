import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import emoji from "remark-emoji";
import hljs from "highlight.js/lib/common";
// 引入markdown中代码显示样式，通过highlight.js实现
import "highlight.js/styles/stackoverflow-light.css";
const Mkd = ({ markdown }) => {

  const lang = useRef()
  const langList = useRef([])
  const preEle = ({ children, node }) => {
    return <pre data-after-content=" ">{ children }</pre>
  }
  const codeBlock = ({ className, children, node }) => {
      if(className) {
        lang.current = className.split("-")[1].toUpperCase()
        langList.current.push(lang.current)
      }
      return <code>{ children }</code>
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    hljs.highlightAll();

    const codes = document.querySelectorAll("pre")
    const codeBlocks = [...codes]
    for(let index in codeBlocks) {
      // 先给他们设置上数据属性
      codeBlocks[index].dataset.afterContent = langList.current[index]
    }
  }, []);
  return (
    <section className="prose max-w-none p-5 prose-img:block lg:prose-p:text-[17.6px]
    prose-img:m-auto prose-h2:text-[16px] lg:prose-pre:text-[16px] prose-pre:text-[14px] dark:prose-code:text-white
     prose-a:text-[#B095DA] dark:prose-invert dark:prose-pre:bg-[#1e293b] prose-pre:bg-[#F2F5F7] prose-code:text-black">
      <Markdown remarkPlugins={[remarkGfm, emoji]} components={{ pre: preEle, code: codeBlock }}>{markdown}</Markdown>
    </section>
  );
};

export default Mkd;
