"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import authService from "../../../services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authService.login({ email, password });
      setToken(res.token);
      router.push("/feed");
    } catch (err:any) {
      setError(err?.response?.data?.error || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login to TaskFlow</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-2 border rounded" placeholder="Email" />
          <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-2 border rounded" placeholder="Password" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm mt-3">Don't have an account? <a href="/register" className="text-blue-600">Register</a></p>
      </div>
    </div>
  );
}
