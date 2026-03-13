"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setMessage(data.error || "Login failed");
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-indigo-600 text-white">
        Login
      </button>
      {message && <p className="text-sm text-rose-300">{message}</p>}
    </form>
  );
}
