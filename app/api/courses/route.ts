import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const courses = await prisma.course.findMany({
    where: { userId: user.userId },
    include: { attendance: true, grade: true, margin: true },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, credits = 0, gradingScheme = "10-point" } = await req.json();
  if (!name) return NextResponse.json({ error: "Course name is required" }, { status: 400 });

  const course = await prisma.course.create({
    data: {
      userId: user.userId,
      name,
      credits,
      gradingScheme,
      attendance: { create: {} },
      grade: { create: { credits } },
      margin: { create: {} }
    }
  });

  return NextResponse.json(course, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, name, credits, gradingScheme } = await req.json();
  if (!id) return NextResponse.json({ error: "Course id required" }, { status: 400 });

  const updated = await prisma.course.updateMany({
    where: { id, userId: user.userId },
    data: { name, credits, gradingScheme }
  });

  if (updated.count === 0) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  if (typeof credits === "number") {
    await prisma.grade.updateMany({ where: { courseId: id }, data: { credits } });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Course id required" }, { status: 400 });

  const deleted = await prisma.course.deleteMany({ where: { id, userId: user.userId } });
  if (!deleted.count) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
