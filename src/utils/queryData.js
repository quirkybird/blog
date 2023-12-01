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
        create_at
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
      create_at
      update_at
    }
  }
`

// 查询所有友链
export const GET_FRIEND_LINKS = gql`
  query getFriendLinks {
    friendlinks {
      nickname
      email
      theme_color
      website_title
      website_link
      website_cover
      website_desr
      create_at
      update_at
    }
  }
`

// 创建留言
export const CREATE_MESSAGE = gql`
  mutation CreateMessage($message: String!) {
    createMessage(message: $message) {
      id
      message
      create_at
      update_at
    }
  }
`

// 获取留言堆数据
export const GET_MESSAGE_STACK = gql`
  query getMessageStack {
    messageStack {
      id
      message
      create_at
      update_at
  }
  }
`

export const CREATE_NEW_POST = gql`
  mutation CreateNewPost($post: UploadPost!) {
    createNewPost(post: $post) {
      message
    }
  }
`