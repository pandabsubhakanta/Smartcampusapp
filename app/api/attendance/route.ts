import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { attendancePercentage, classesCanMiss } from "@/lib/calculations";

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId, classesHeld, classesAttended } = await req.json();
  const course = await prisma.course.findFirst({ where: { id: courseId, userId: user.userId } });
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  const record = await prisma.attendance.upsert({
    where: { courseId },
    create: { courseId, classesHeld, classesAttended },
    update: { classesHeld, classesAttended }
  });

  return NextResponse.json({
    ...record,
    attendancePercentage: attendancePercentage(record.classesHeld, record.classesAttended),
    canMissClasses: classesCanMiss(record.classesHeld, record.classesAttended)
  });
}
