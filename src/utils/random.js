 // 获得固定闭区间随机数
 const getRandomNumber = (min, max, excludedRange) => {
  let num;
  if(!excludedRange) 
    num = Math.floor(Math.random() * (max - min + 1) + min)
  else {
    do {
      num = Math.floor(Math.random() * (max - min + 1) + min)
  } while (num >= excludedRange[0] && num <= excludedRange[1]);
  }
  return num;
}

export default getRandomNumber