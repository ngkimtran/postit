"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { UserPostsType } from "../types/UserPosts";

type EditPostsProps = {
  avatar: string;
  name: string;
  title: string;
  id: string;
  comments: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

const EditPosts = ({ avatar, name, title, comments, id }: EditPostsProps) => {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            Comments ({comments.length})
          </p>
        </Link>
        <button className="text-sm font-bold text-red-500">Delete</button>
      </div>
    </div>
  );
};

export default EditPosts;
