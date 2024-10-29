const BASE_URL = 'https://blog.yamorz.top';

// 获取所有文章
export async function getAllPosts() {
  const raw = await fetch(`${BASE_URL}/aJson.json`);
  const res = await raw.json();
  res.article.reverse();
  return res;
}

//获取文章详情
export async function getPostDetail(id) {
  const raw = await fetch(`${BASE_URL}/aJson.json`);
  const res = await raw.json();
  const onePost = res?.article.filter((item) => String(item.id) === String(id));
  return onePost;
}
