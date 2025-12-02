"use client";
import { useState } from "react";
import { createPost } from "@/api/posts";

export default function CreatePostForm({ onPostCreated }: any) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);

    const form = new FormData();
    form.append("text", text);
    if (image) form.append("image", image);

    await createPost(form);
    setText("");
    setImage(null);
    onPostCreated();
    setLoading(false);
  };

  return (
    <div className="border rounded p-4 bg-white shadow">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Share something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        className="mt-2"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
