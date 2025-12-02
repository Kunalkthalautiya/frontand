"use client";
import { useEffect, useState } from "react";
import { getFeedPosts } from "@/api/posts";
import CreatePostForm from "@/components/posts/CreatePostForm";
import PostCard from "@/components/posts/PostCard";

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const loadPosts = async () => {
    const res = await getFeedPosts(page);
    setPosts((prev) => [...prev, ...res.data.posts]);
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  return (
    <div className="max-w-xl mx-auto pt-6 space-y-4">
      <CreatePostForm onPostCreated={() => (setPosts([]), setPage(1))} />
      {posts.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}

      <button
        className="bg-gray-200 px-4 py-2 rounded"
        onClick={() => setPage((prev) => prev + 1)}
      >
        Load More
      </button>
    </div>
  );
}
