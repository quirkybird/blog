import { useEffect, useRef } from "react";

const UploadFile = ({uploadRef, getFileName}) => {
  const imgFileInput = useRef(null);
  const mdFileInput = useRef(null);
  useEffect(() => {
    const imgInputRef = imgFileInput.current
    const mdInputRef = mdFileInput.current
    const upload = uploadRef.current
    const handleUploadFile = async (e) => {
      // 阻止默认事件
      e.preventDefault()
      const imgfile = imgInputRef.files[0];
      const mdfile = mdInputRef.files[0];
      // 设置mimeType类型值
      // img浏览器会自动识别
      // mdfile.type = "text/markdown"
      const formData = new FormData();
      formData.append("image", imgfile);
      formData.append("markdown", mdfile);
      const res = await fetch("https://server.yamorz.top/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json()
      // 将使用回调函数，传回响应值
      getFileName(data)
    }
    upload.addEventListener("submit", handleUploadFile);
    return () => {
      upload.removeEventListener("submit", handleUploadFile)
    }
  });
  return (
    <div>
      <label>上传文章内容</label>
      <input type="file" ref={mdFileInput}/>
      <br />
      <label> 上传文章封面 </label>
      <input type="file" ref={imgFileInput} />
    </div>
  );
};

export default UploadFile;
