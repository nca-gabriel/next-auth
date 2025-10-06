"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoginBtn from "@/components/LoginBtn"; // GitHub OAuth
import LogoutBtn from "@/components/LogoutBtn";

export default function HomePage() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hasSession, setHasSession] = useState(false);

  const router = useRouter();

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        setHasSession(!!data?.user);
      } catch {
        setHasSession(false);
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        // 1️⃣ Sign up via custom API
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || data.message || "Something went wrong");
          return;
        }

        // 2️⃣ Auto-login after signup
        await signIn("credentials", {
          redirect: true,
          email,
          password,
          callbackUrl: "/user-info",
        });
      } else {
        // Login via NextAuth Credentials
        await signIn("credentials", {
          redirect: true,
          email,
          password,
          callbackUrl: "/user-info",
        });
      }
    } catch {
      setError("Network error");
    }
  };

  if (hasSession) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
        <p className="mb-3">You are signed in</p>
        <div className="flex flex-col gap-2">
          <a href="/user-info" className="text-blue-500 underline">
            User Info
          </a>
          <a href="/todo" className="text-blue-500 underline">
            Todo
          </a>
          <LogoutBtn />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">
        {isSignup ? "Sign Up" : "Login"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <p className="mt-3 text-sm text-gray-600">
        {isSignup ? "Already have an account?" : "No account yet?"}{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-500 underline"
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>

      <div className="mt-4">
        <p className="text-sm mb-2">Or login with GitHub:</p>
        <LoginBtn />
      </div>
    </div>
  );
}
