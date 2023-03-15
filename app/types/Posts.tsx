export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  comments: {
    content: string;
    id: string;
    createdAt: string;
    postId: string;
    userId: string;
  }[];
};
