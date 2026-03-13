import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { weightedGpa } from "@/lib/calculations";

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const grades = await prisma.grade.findMany({
    where: { course: { userId: user.userId } },
    include: { course: true }
  });

  const semesterGpa = weightedGpa(grades.map((g) => ({ grade: g.grade, credits: g.credits || g.course.credits })));
  return NextResponse.json({ semesterGpa, grades });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId, grade, credits } = await req.json();
  const course = await prisma.course.findFirst({ where: { id: courseId, userId: user.userId } });
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  const record = await prisma.grade.upsert({
    where: { courseId },
    create: { courseId, grade, credits: credits ?? course.credits },
    update: { grade, credits: credits ?? course.credits }
  });

  return NextResponse.json(record);
}
