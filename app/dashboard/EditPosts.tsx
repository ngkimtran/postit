"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeletePopup from "./DeletePopup";
import toast from "react-hot-toast";

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
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (id: string) =>
      await toast.promise(axios.delete("/api/posts/deletePost", { data: id }), {
        loading: "Deleting your post",
        success: "Post has been deleted 😢",
        error: (error) => error?.response?.data.message,
      }),
    {
      onError: (error) => console.log(error),
      onSuccess: () => queryClient.invalidateQueries(["user-posts"]),
    }
  );

  const deletePost = () => {
    mutate(id);
  };

  return (
    <>
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
          <button
            onClick={() => setToggle(true)}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <DeletePopup deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
};

export default EditPosts;
