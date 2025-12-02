"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import authService from "../../../services/auth.service";

export default function RegisterPage() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await authService.register({ name, email, password });
      setToken(res.token);
      router.push("/feed");
    } catch (err:any) {
      setError(err?.response?.data?.error || "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Create an account</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 border rounded" placeholder="Full name" />
          <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Email" />
          <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Password (min 6)" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="text-sm mt-3">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
      </div>
    </div>
  );
}
