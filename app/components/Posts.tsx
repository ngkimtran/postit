"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { PostType } from "../types/Posts";

const getAllPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

const Posts = () => {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: getAllPosts,
    queryKey: ["posts"],
  });

  if (error) return <div>Error fetching data</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {data?.map((post) => (
        <div key={post.id} className="bg-white my-8 p-8 rounded-lg">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={post.user.image}
              alt="avatar"
            />
            <h3 className="font-bold text-gray-700">{post.user.name}</h3>
          </div>
          <div className="my-8">
            <p className="break-all">{post.title}</p>
          </div>
          <div className="flex gap-4 cursor-pointer items-center">
            <Link href={`/post/${post.id}`}>
              <p className="text-sm font-bold text-gray-700">
                Comments ({post.comments.length})
              </p>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
