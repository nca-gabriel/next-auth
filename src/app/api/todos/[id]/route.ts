import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-guard";

export async function GET(req: Request, context: { params: { id: string } }) {
  const user = await requireUser(req); // Type casting for NextRequest
  const { id } = context.params;

  const todo = await prisma.todo.findUnique({ where: { id, userId: user.id } });
  if (!todo) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const user = await requireUser(req);
  const { id } = context.params;

  const data = await req.json();
  const { title, completed } = data;

  const todo = await prisma.todo.update({
    where: { id, userId: user.id },
    data: {
      title,
      completed,
    },
  });
  return NextResponse.json(todo);
}

export async function DElETE(
  req: Request,
  context: { params: { id: string } }
) {
  const user = await requireUser(req);
  const { id } = context.params;

  await prisma.todo.delete({ where: { id, userId: user.id } });
  return NextResponse.json({ message: "Todo deleted" });
}
