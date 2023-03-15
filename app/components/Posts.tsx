"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SinglePost from "./SinglePost";
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
        <SinglePost
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          title={post.title}
          id={post.id}
          comments={post.comments}
        />
      ))}
    </>
  );
};

export default Posts;
