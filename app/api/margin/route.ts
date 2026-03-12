import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { marginDetails } from "@/lib/calculations";

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId, internalMarks, assignmentMarks, examMarks, totalMarks, targetMarks } = await req.json();
  const course = await prisma.course.findFirst({ where: { id: courseId, userId: user.userId } });
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  const record = await prisma.margin.upsert({
    where: { courseId },
    create: { courseId, internalMarks, assignmentMarks, examMarks, totalMarks, targetMarks },
    update: { internalMarks, assignmentMarks, examMarks, totalMarks, targetMarks }
  });

  return NextResponse.json({ ...record, ...marginDetails(record) });
}
