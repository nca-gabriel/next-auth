import React from "react";
import { auth } from "../../lib/auth";
import Image from "next/image";

export default async function page() {
  const session = await auth();

  return (
    <div>
      <h1>NextAuth v5 + Next 15</h1>
      <p>User signed in</p>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.name}</p>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="user-img"
          width={78}
          height={78}
          priority
          style={{ borderRadius: "50%" }}
        />
      )}
    </div>
  );
}
