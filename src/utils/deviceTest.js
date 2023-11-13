const deviceTest = () => {
  const user_agent = navigator.userAgent
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const desktopRegex = /Windows|Macintosh|Linux/i; 
  if(mobileRegex.test(user_agent)) return "mobile"
  if(desktopRegex.test(user_agent)) return "desktop"
}

export default deviceTest