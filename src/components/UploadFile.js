import { useEffect, useRef } from "react";

const UploadFile = () => {
  const fileInput = useRef(null);
  const upload = useRef(null);
  useEffect(() => {
    const fileInputRef = fileInput.current
    const uploadRef = upload.current
    const handleUploadFile = async () => {
      const file = fileInputRef.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("http://localhost:2333/upload-image", {
        method: "POST",
        body: formData
      });
      console.log(res)
    }
    uploadRef.addEventListener("click", handleUploadFile);
    return () => {
      uploadRef.removeEventListener("click", handleUploadFile)
    }
  }, []);
  return (
    <div>
      <input type="file" ref={fileInput} />
      <button ref={upload}>上传</button>
    </div>
  );
};

export default UploadFile;
