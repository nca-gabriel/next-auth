import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// runs only for /user-info and subpaths
export async function middleware(request: NextRequest) {
  console.log("middleware running for protected route");

  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user-info"], // only these paths trigger middleware
};
