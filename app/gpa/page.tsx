"use client";

import { useEffect, useState } from "react";
import ApiForm from "@/components/ApiForm";
import DataTable from "@/components/DataTable";

type GpaData = {
  semesterGpa: number;
  grades: Array<{ course: { name: string }; credits: number; grade: number }>;
};

export default function GpaPage() {
  const [data, setData] = useState<GpaData | null>(null);
  const load = () => fetch("/api/gpa").then((r) => r.json()).then(setData);

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Weighted GPA Calculator (10-Point)</h1>
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <p className="text-sm text-slate-300">Semester GPA</p>
        <p className="text-3xl font-semibold">{data?.semesterGpa ?? 0}/10</p>
      </div>
      <ApiForm
        endpoint="/api/gpa"
        onSuccess={load}
        fields={[
          { name: "courseId", label: "Course ID", type: "number" },
          { name: "credits", label: "Credits", type: "number" },
          { name: "grade", label: "Grade (0-10)", type: "number" }
        ]}
      />
      <DataTable
        title="Course Grades"
        headers={["Course", "Credits", "Grade"]}
        rows={(data?.grades ?? []).map((g) => [g.course.name, g.credits, g.grade])}
      />
    </div>
  );
}
