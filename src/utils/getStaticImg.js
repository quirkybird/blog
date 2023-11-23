const getStaticImg = async (url, element) => {
  const img = document.createElement("img");
  let tips = ""
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "image/*",
      },
    });
    if (!response.headers.get("Content-Type").startsWith("image")) {
      tips = "我的朋友嘛, 请上传图片"
      return {img, tips}
    } else if (!response.ok) {
      throw new Error("网络错误");
    } else {
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      img.src = objectURL;
      element.appendChild(img);
      tips = "成功添加留言，欢迎经常来玩儿"
      return {img, tips};
    }
  } catch (error) {
    if (error.message === "Failed to fetch")
    tips = "出现了未知错误，检查一下地址是否正确, 可能是地址存在跨域阻止"
    return {img, tips}
      // throw new Error(
      //   "出现了未知错误，检查一下地址是否正确, 可能是地址存在跨域阻止"
      // );
  }
};

export default getStaticImg;
