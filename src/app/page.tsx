import React from "react";
import { auth } from "../auth";
import LoginBtn from "./components/LoginBtn";
import LogoutBtn from "./components/LogoutBtn";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return (
      <div>
        <Link href="/user-info">User Info</Link>
        <LogoutBtn />
      </div>
    );
  }
  return (
    <div>
      <p>You are not signed in</p> <LoginBtn />
    </div>
  );
}
