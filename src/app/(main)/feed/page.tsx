"use client";
import useSWR from "swr";
import api from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FeedPage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(()=>{
    if(!token) router.push("/login");
  },[token]);

  const fetcher = (url:string) => api.get(url).then(r=>r.data);
  const { data, error } = useSWR(token ? "/feed" : null, fetcher);

  if(!token) return <div className="p-6">Redirecting to login...</div>;
  if(error) return <div className="p-6">Failed to load feed</div>;
  if(!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Home feed</h1>
      {data.data?.length === 0 && <div>No posts yet.</div>}
      {data.data?.map((post:any) => (
        <div key={post._id} className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-medium">{post.title}</h3>
          <p className="text-gray-700 mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  )
}
