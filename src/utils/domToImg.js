import html2canvas from "html2canvas"
// 使用html2canvas库将Dom转为img
const domToImg = async (element) => {
  
  const canvas = await html2canvas(element)

  return canvas.toDataURL('image/png'); // 获取 Data URL
};

export default domToImg
