import React from "react";
import { requireUser } from "@/lib/auth-guard";
import Link from "next/link";
import LogoutBtn from "../components/LogoutBtn";
import LoginBtn from "../components/LoginBtn";

export default async function Home() {
  let user;
  try {
    user = await requireUser();
    console.log("User:", user);
  } catch {
    user = null;
  }

  if (user) {
    return (
      <div>
        <p>Welcome {user.name}</p>
        <Link href="/user-info">User Info</Link>
        <Link href="/todo">Todo</Link>
        <LogoutBtn />
      </div>
    );
  }

  return (
    <div>
      <p>You are not signed in</p>
      <LoginBtn />
    </div>
  );
}
