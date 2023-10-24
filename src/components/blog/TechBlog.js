import Mkd from "./Mkd";

const tempMarkStr = `
在使用tailwindcss来动态绑定绑定类名时遇到了无法实现的情况，开始真是让人百思不得其解
## 想实现一个根据字段自动匹配颜色的标签
信箱这不是很简单，\`switch\`来匹配识别\`tag\`字段并返回颜色，在tailwindcss的\`bg-[颜色值]\`自定义背景，拿捏！
![image.png](https://img1.imgtp.com/2023/10/24/c6XJePL1.png)
它本身是我设定的一个react组件，代码如下  
\`\`\`javascript
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
    <section className="tracking-wider prose prose-s max-w-none p-10 prose-h2:text-[20px] prose-pre:bg-[#F6F6F6] prose-code:text-l prose-code:font-bold">
      <Markdown remarkPlugins={[remarkGfm, emoji]}>{markdown}</Markdown>
    </section>
  );
};

export default Mkd;


\`\`\`
接下来就让我不淡定了，代码好好的，怎么我的标签就不显示颜色呢？

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/812bdf80d2dc4efdbd15ad8d7d210411~tplv-k3u1fbpfcp-watermark.image?)

马上打开控制台看看是不是动态匹配值没设置上去

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/023b316eee4048998a29e4dcaf8c29a3~tplv-k3u1fbpfcp-watermark.image?)

可以看到，对于bg字符串已经拼接好了，这就奇怪了，再去搜搜它的背景样式字段：\`background-color\`，
并没有这个字段，说明tailwindcss并没有把\`bg-[颜色值]\`解析并渲染上去，于是我开始在互联网上遨游...,寻求答案

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/625f3e4a7f2a4168a66736c5c2fab5e4~tplv-k3u1fbpfcp-watermark.image?)

> two thousand years later... 
## 原来这样解决
最后在官方文档找到了答案,还得是多看看官方文档,相关链接：[不要动态构造域名](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)  
简单总结一下，\`tailwindcss\`类名只接受 **作为完整不间断字符串存在的类**，
意思是我需要将那一句代码改为：  
~~~js 
         <span
          key={index}
          className={\`inline-block text-white p-0.5 m-1.5 ml-0 rounded-md \${bg-[selectColor(tag)]}\`}
        >
          {tag}
        </span>
~~~
另外我还有一种解决方案就是使用内联样式: 
~~~js 
style={{ background: selectColor(tag) }}
~~~
## 感悟
学习一个新的东西总会踩很多坑，之前从来没有记录过，踩过的坑还会重复踩，并且还会花费很多时间去重新搜索解决，小到一个类似的问题，大到一个项目架构和其它解决方案，还是要多学会总结与复盘啊，上面的情况就是我在搭建个人的博客中遇到的一个问题，趁着边搭建，边输出一些问题想法和解决措施，还能为博客搭建好后，没有文章可发的尴尬处境，建立一些基础。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fd04731f09443ce9d39f51b239e30fb~tplv-k3u1fbpfcp-watermark.image?)
`

const TechBlog = ({ blog }) => {
  return (
    <main>
      <article className="max-w-[900px] m-auto relative">
        <section className="text-center mt-24">
          <h1 className="text-2xl lg:text-3xl font-[800] mb-3">{blog.title}</h1>
          <span>{blog.date}</span>
        </section>
        {/* markdown组件，传入数据可以直接按照markdow渲染 */}
        <Mkd markdown={tempMarkStr} />
      </article>
    </main>
  );
};

export default TechBlog;
