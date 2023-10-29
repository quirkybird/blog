import { useEffect, useRef } from "react";
import UploadFile from "../components/UploadFile";
const NewBlog = () => {
  
  const newBlogFormRef = useRef(null)
  useEffect(() => {
    const newBlogForm = newBlogFormRef.current
    const onSubmit = (e) => {
      e.preventDefault()
      const form = new FormData(e.target)
      console.log(form.get("title"))
    }
    newBlogForm.addEventListener("submit", onSubmit)
    return () => {
    newBlogForm.removeEventListener("submit", onSubmit)
    }
  }, [])

  return (
    <main>
      <section className="max-w-[900] sm:w-[60vw] m-auto">
        <form ref={newBlogFormRef}>
          <div>
            <label htmlFor="title">标题</label>
            <input id="title" name="title" type="text" placeholder="请输入标题" />
          </div>
          <div>
            <label htmlFor="desr">博客内容简介</label>
            <textarea id="desr" name="desr" placeholder="粘贴文章简介..." />
          </div>
          <div>
            <label htmlFor="title">上传封面</label>
            <UploadFile />
          </div>
          <div>
            <label htmlFor="author">作者</label>
            <input id="author" name="author" type="text" placeholder="请输入作者" />
          </div>
          <div>
            <label htmlFor="categories">类别</label>
            <input id="categories" name="categories" type="text" placeholder="请选择类别" />
          </div>
          <div>
            <label htmlFor="tags">标签</label>
            <input id="tags" name="tags" type="text" placeholder="请选择类别" />
          </div>
          <div>
            <label htmlFor="content">博客内容</label>
            <textarea id="content" name="content" placeholder="粘贴文章内容..." />
          </div>
          <button className="bg-blue-500 rounded-md text-white p-1">我要发布文章</button>
        </form>
      </section>
    </main>
  );
};

export default NewBlog;
