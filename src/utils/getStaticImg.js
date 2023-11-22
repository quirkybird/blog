const getStaticImg = async (url, element) => {
  const img = document.createElement('img');
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "image/*",
      }
    })
    if(!response.headers.get("Content-Type").startsWith("image")) {
      window.alert("我的朋友嘛, 请上传图片")
    } 
    if (!response.ok) {
      throw new Error('网络错误');
    }
    const blob = await response.blob()
    const objectURL = URL.createObjectURL(blob);
    img.src = objectURL;
    element.appendChild(img); 
    return img
  } catch (error) {
    if(error.message === "Failed to fetch")
    throw new Error('出现了未知错误，检查一下地址是否正确, 可能是地址存在跨域阻止')
  }
}

export default getStaticImg