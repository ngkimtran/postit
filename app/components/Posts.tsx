"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../types/Posts";
import SinglePost from "./SinglePost";

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
          avatar={post.user.image}
          name={post.user.name}
          title={post.title}
          comments={post.comments}
          id={post.id}
        />
      ))}
    </>
  );
};

export default Posts;
