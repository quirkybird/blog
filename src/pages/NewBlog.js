import { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_POST } from '../utils/queryData';
import UploadFile from '../components/common/UploadFile';
import Mkd from '../components/common/Mkd';
const NewBlog = () => {
  const newBlogFormRef = useRef(null);
  const [content, setContent] = useState('');

  // 使用apollo/client hooks
  const [createNewPost, { data, loading }] = useMutation(CREATE_NEW_POST);
  // 定义函数来获得子组件传值
  //这是一个callback函数，子组件完成指定操作后执行
  const getFileName = ({ coverFileName, blogFileName }) => {
    // 在上述文件传输完成过后继续继续执行代码，保证文件成功上传
    const newBlogForm = newBlogFormRef.current;
    const formdata = new FormData(newBlogForm).entries();
    const formObj = {};
    for (const name of formdata) {
      formObj[name[0]] = name[1];
    }
    formObj.content = blogFileName;
    formObj.image = coverFileName;

    // 使用graphql上传文件
    createNewPost({
      variables: {
        post: formObj,
      },
    });
  };

  //返回最新的content，用来预览内容
  const getMkdContent = (c) => {
    setContent(c);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex">
      <section className="flex-1">
        <form ref={newBlogFormRef}>
          <div>
            <label htmlFor="title">标题</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="请输入标题"
            />
          </div>
          <div>
            <label htmlFor="descr">博客内容简介</label>
            <textarea id="descr" name="descr" placeholder="粘贴文章简介..." />
          </div>
          <div>
            <label htmlFor="author">作者</label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="请输入作者"
            />
          </div>
          <div>
            <label htmlFor="categories">类别</label>
            <input
              id="categories"
              name="categories"
              type="text"
              placeholder="请选择类别"
            />
          </div>
          <div>
            <label htmlFor="tags">标签</label>
            <input id="tags" name="tags" type="text" placeholder="请选择类别" />
          </div>
          <div>
            <UploadFile
              uploadRef={newBlogFormRef}
              getFileName={getFileName}
              getMkdContent={getMkdContent}
            />
          </div>
          <button className="bg-blue-500 rounded-md text-white p-1">
            我要发布文章
          </button>
        </form>
        <div className="text-6xl">{loading && '正在上传文章'}</div>
        <div className="text-6xl">
          {data && data.createNewPost.message + ',文章发表成功'}
        </div>
      </section>
      <section className="flex-[2_2_0%]">
        <Mkd markdown={content} />
      </section>
    </main>
  );
};

export default NewBlog;
