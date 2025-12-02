"use client";
import { useState } from "react";
import { likePost } from "@/api/likes";

export default function LikeButton({ postId, likes }: any) {
  const [count, setCount] = useState(likes);

  const handleLike = async () => {
    await likePost(postId);
    setCount((prev: number) => prev + 1);
  };

  return (
    <button onClick={handleLike} className="text-blue-600 font-semibold">
      👍 {count}
    </button>
  );
}
