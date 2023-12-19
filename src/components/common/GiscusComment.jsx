import Giscus from "@giscus/react";
const GiscusComment = () => {
  return (
    <section className="w-full">
      <Giscus
        src="https://giscus.app/client.js"
        repo="quirkybird/blog-yamorz-giscus"
        repoId="R_kgDOK7VikA"
        category="Announcements"
        categoryId="DIC_kwDOK7VikM4Cb2kU"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="zh-CN"
        loading="lazy"
        crossorigin="anonymous"
      />
    </section>
  );
};

export default GiscusComment;
