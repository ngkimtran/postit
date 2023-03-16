"use client";

import AddComment from "@/app/components/AddComment";
import SinglePost from "@/app/components/SinglePost";
import Image from "next/image";
import Link from "next/link";
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
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="bg-white my-2 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={24}
              height={24}
              src={data.user.image}
              alt="avatar"
            />
            <h3 className="font-bold text-gray-700">{data.user.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>{" "}
          </div>
          <div className="py-4">{comment.content}</div>
        </div>
      ))}
    </>
  );
};

export default PostDetail;
