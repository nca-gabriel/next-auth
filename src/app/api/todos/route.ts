import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-guard";

export async function GET(req: Request) {
  const user = await requireUser(req);

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const user = await requireUser(req);

  const body = await req.json();
  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      userId: user.id,
    },
  });
  return NextResponse.json(todo);
}
