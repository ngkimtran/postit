"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type AddCommentProps = {
  postId: string;
};

type Comment = {
  postId: string;
  content: string;
};

const AddComment = ({ postId }: AddCommentProps) => {
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (data: Comment) =>
      await toast.promise(
        axios.post(`/api/posts/${postId}/addComment`, { data }),
        {
          loading: "Creating your comment",
          success: "Comment has been made 🚀",
          error: (error) => error?.response?.data.message,
        }
      ),
    {
      onError: (error) => {
        console.log(error);
        setIsDisabled(false);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        setContent("");
        setIsDisabled(false);
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate({ content, postId });
  };

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setContent(e.target.value)}
          value={content}
          type="text"
          name="comment"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add a comment 🚀
        </button>
        <p
          className={`font-bold text-sm ${
            content.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${content.length}/300`}</p>
      </div>
    </form>
  );
};

export default AddComment;
