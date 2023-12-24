import Giscus from "@giscus/react";
import { useContext, useState, useLayoutEffect } from "react";
import { ThemeContext } from "../../App";
const GiscusComment = () => {
  const theme_mode = useContext(ThemeContext)
  const [theme, setTheme] = useState("preferred_color_scheme")
  useLayoutEffect(() => {
    if(theme_mode === "dark") {
      setTheme("dark_dimmed")
    }
    if(theme_mode === "light") {
      setTheme("preferred_color_scheme")
    }
  }, [theme_mode])

  return (
    <section className="w-full pt-10 pb-6">
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
        theme={theme}
        lang="zh-CN"
        loading="lazy"
        crossorigin="anonymous"
      />
    </section>
  );
};

export default GiscusComment;
