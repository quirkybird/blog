const formDate = (timestamp) => {
  const date = new Date(Number(timestamp));
  console.log(date)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = year + "/" + month + "/" + day;
  return formattedDate
}

export default formDate