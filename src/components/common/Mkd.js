import { useEffect, useRef, useContext } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import emoji from 'remark-emoji';
import hljs from 'highlight.js/lib/common';
import { ThemeContext } from '../../App';

const Mkd = ({ markdown }) => {
  // 上下文获取theme
  const theme = useContext(ThemeContext);

  const lang = useRef();
  const langList = useRef([]);
  const preEle = ({ children, node }) => {
    return <pre data-after-content=" ">{children}</pre>;
  };
  const codeBlock = ({ className, children, node }) => {
    if (className) {
      lang.current = className.split('-')[1].toUpperCase();
      langList.current.push(lang.current);
    }
    return <code>{children}</code>;
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    hljs.highlightAll();

    // 动态引入markdown中代码显示样式，通过highlight.js实现
    // 实现效果很不理想，不知道如何解决
    if (theme === 'light') {
      (async () => {
        await import('highlight.js/styles/stackoverflow-light.css');
      })();
    } else {
      (async () => {
        await import('highlight.js/styles/stackoverflow-dark.css');
      })();
    }

    const codes = document.querySelectorAll('pre');
    const codeBlocks = [...codes];
    for (let index in codeBlocks) {
      // 先给他们设置上数据属性
      codeBlocks[index].dataset.afterContent = langList.current[index];
    }
  }, [theme, markdown]);
  return (
    <section
      className="prose max-w-none p-8 prose-img:block prose-p:text-[14px] lg:prose-p:text-[15px]
    prose-img:m-auto prose-img:shadow prose-img:rounded-md prose-pre:text-[14px] prose-blockquote:break-all
     prose-a:text-[#3bb0f0] dark:prose-invert dark:prose-pre:bg-[#1e293b] prose-pre:bg-[#F2F5F7]"
    >
      <Markdown
        remarkPlugins={[remarkGfm, emoji]}
        rehypePlugins={[rehypeRaw]}
        components={{ pre: preEle, code: codeBlock }}
      >
        {markdown}
      </Markdown>
    </section>
  );
};

export default Mkd;
