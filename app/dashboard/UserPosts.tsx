"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { UserPostsType } from "../types/UserPosts";
import EditPosts from "./EditPosts";

const getUserPosts = async () => {
  const response = await axios.get("/api/posts/userPosts");
  return response.data;
};

const UserPosts = () => {
  const { data, error, isLoading } = useQuery<UserPostsType>({
    queryFn: getUserPosts,
    queryKey: ["user-posts"],
  });

  if (error) return <div>Error fetching data</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log();

  return (
    <>
      {data?.posts?.map((post) => (
        <EditPosts
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
          id={post.id}
        />
      ))}
    </>
  );
};

export default UserPosts;
