"use client";

import { logout } from "../lib/actions/auth.action";

export default function LogoutBtn() {
  return (
    <button onClick={() => logout()} className="bg-gray-200">
      Sign Out
    </button>
  );
}
