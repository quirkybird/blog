import { useEffect, useRef } from 'react';

const UploadFile = ({ uploadRef, getFileName, getMkdContent }) => {
  const imgFileInput = useRef(null);
  const mdFileInput = useRef(null);

  // 文件发生变化进行文件读取展示
  const onPostChange = () => {
    const mdInputRef = mdFileInput.current;
    const mdfile = mdInputRef.files[0];

    // 新建 FileReader 对象
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      // 调用回调函数，传回文章内容
      getMkdContent(content);
    };
    // 读取为文本文件
    reader.readAsText(mdfile);
  };

  useEffect(() => {
    const imgInputRef = imgFileInput.current;
    const mdInputRef = mdFileInput.current;
    const upload = uploadRef.current;
    const handleUploadFile = async (e) => {
      // 阻止默认事件
      e.preventDefault();
      const imgfile = imgInputRef.files[0];
      const mdfile = mdInputRef.files[0];
      // 设置mimeType类型值
      // img浏览器会自动识别
      // mdfile.type = "text/markdown"
      const formData = new FormData();

      console.log(mdfile, '--md');

      // 新建 FileReader 对象
      const reader = new FileReader();

      reader.onload = async function (e) {
        let index = 0;
        const content = e.target.result;
        // 正则表达式，用于匹配Markdown中的图片URL
        const regex = /!\[.*?\]\((.*?)\)/g;

        // 使用 matchAll 获取所有匹配结果
        const matches = [...content.matchAll(regex)];

        // 提取URL部分并存储在数组中
        const urls = matches.map((match) => match[1]);
        console.log(urls, '--urls');

        //把url交给服务器处理，返回替换url后的链接
        const replacedUrls = await fetch('https://server.yamorz.top/replace', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            urls,
          }),
        }).then((res) => res.json());

        console.log(replacedUrls, '---res');

        const newContent = content.replace(regex, (match, p1) => {
          return match.replace(p1, replacedUrls[index++]);
        });

        const modifiedBlob = new Blob([newContent]);
        const modifiedFile = new File([modifiedBlob], mdfile.name);

        formData.append('image', imgfile);
        formData.append('markdown', modifiedFile);
        const res = await fetch('https://server.yamorz.top/upload-image', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        // 将使用回调函数，传回响应值
        getFileName(data);
      };

      // 读取为文本文件
      reader.readAsText(mdfile);

      // await new Promise((resolve, reject) => {
      //   setTimeout(() => resolve(), 100000000);
      // });
    };
    upload.addEventListener('submit', handleUploadFile);
    return () => {
      upload.removeEventListener('submit', handleUploadFile);
    };
  });
  return (
    <div>
      <label>上传文章内容</label>
      <input type="file" ref={mdFileInput} onChange={onPostChange} required />
      <br />
      <label> 上传文章封面 </label>
      <input type="file" ref={imgFileInput} required />
    </div>
  );
};

export default UploadFile;
