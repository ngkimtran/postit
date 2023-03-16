"use client";

import AddComment from "@/app/components/AddComment";
import SinglePost from "@/app/components/SinglePost";
import { PostType } from "@/app/types/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type URL = {
  params: {
    slug: string;
  };
};

const getPost = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

const PostDetail = (url: URL) => {
  const { data, error, isLoading } = useQuery<PostType>({
    queryFn: () => getPost(url.params.slug),
    queryKey: ["post-detail"],
  });

  if (error) return <div>Error fetching data</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {data && (
        <div>
          <SinglePost
            avatar={data.user.image}
            name={data.user.name}
            title={data.title}
            comments={data.comments}
            id={data.id}
          />
          <AddComment postId={data.id} />
        </div>
      )}
    </>
  );
};

export default PostDetail;
