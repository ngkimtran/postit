export type UserPostsType = {
  name: string;
  image: string;
  id: string;
  email: string;
  posts: {
    title: string;
    id: string;
    createdAt: string;
    comments: {
      content: string;
      id: string;
      createdAt: string;
      postId: string;
      userId: string;
    }[];
  }[];
};
