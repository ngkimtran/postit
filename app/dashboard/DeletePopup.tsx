"use client";

type DeletePopupProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

const DeletePopup = ({ deletePost, setToggle }: DeletePopupProps) => {
  return (
    <div
      onClick={() => setToggle(false)}
      className="fixed bg-black/20 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6 text-center">
        <h2 className="text-xl">
          Are you sure you want to delete this post? 😢
        </h2>
        <h3 className="text-red-600 text-sm">
          ❗Pressing the delete button will permanantly delete your post❗
        </h3>
        <button
          onClick={deletePost}
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
        >
          Delete post
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
