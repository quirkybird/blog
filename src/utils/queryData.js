import { gql } from "@apollo/client";
// 查询最近的文章
export const GET_RECENT_POSTS = gql`
  query getRecnetPost {
    recentPost {
      id
      author
      title
      date
      categories
      content
      descr
      tags
      link
      image
    }
  }
`;
// 查询所有文章
export const GET_ALL_POSTS = gql`
    query getAllPosts {
      allPost {
        id
        title
        date
        categories
      }
    }
    `
// 根据ID查询文章详情

export const GET_POST_DETAIL = gql`
  query getPostDetail($id: Int!) {
    post(id: $id) {
      id
      title
      author
      date
      categories
      content
    }
  }
`