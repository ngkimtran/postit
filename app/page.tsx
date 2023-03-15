"use client";

import AddPost from "./components/AddPost";
import Posts from "./components/Posts";

export default function Home() {
  return (
    <main>
      <AddPost />
      <Posts />
    </main>
  );
}
