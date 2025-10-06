"use client";

import { login } from "../lib/actions/auth.action";

export default function LoginBtn() {
  return (
    <button onClick={() => login()} className="bg-gray-200">
      Sign In - Github
    </button>
  );
}
