import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../../lib/prisma";
import { authConfig } from "../../../../lib/auth.config";

const { handlers } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
});

export const { GET, POST } = handlers;
