import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { attendancePercentage, weightedGpa, marginDetails } from "@/lib/calculations";

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const courses = await prisma.course.findMany({
    where: { userId: user.userId },
    include: { attendance: true, grade: true, margin: true }
  });

  const attendanceValues = courses
    .filter((c) => c.attendance)
    .map((c) => attendancePercentage(c.attendance!.classesHeld, c.attendance!.classesAttended));

  const overallAttendance = attendanceValues.length
    ? Number((attendanceValues.reduce((a, b) => a + b, 0) / attendanceValues.length).toFixed(2))
    : 0;

  const gpa = weightedGpa(courses.map((c) => ({ grade: c.grade?.grade ?? 0, credits: c.grade?.credits ?? c.credits })));

  const courseWise = courses.map((course) => ({
    id: course.id,
    name: course.name,
    credits: course.credits,
    attendance: course.attendance
      ? attendancePercentage(course.attendance.classesHeld, course.attendance.classesAttended)
      : 0,
    grade: course.grade?.grade ?? 0,
    margin: course.margin ? marginDetails(course.margin) : null
  }));

  return NextResponse.json({ overallAttendance, currentWeightedGPA: gpa, courseWise });
}
