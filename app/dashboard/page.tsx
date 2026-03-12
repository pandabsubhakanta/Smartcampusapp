"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";

type DashboardData = {
  overallAttendance: number;
  currentWeightedGPA: number;
  courseWise: Array<{ id: number; name: string; credits: number; attendance: number; grade: number }>;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-300">Overall Attendance</p>
          <p className="text-3xl font-semibold">{data?.overallAttendance ?? 0}%</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-300">Current Weighted GPA</p>
          <p className="text-3xl font-semibold">{data?.currentWeightedGPA ?? 0}/10</p>
        </div>
      </div>

      <DataTable
        title="Course-wise Performance"
        headers={["Course", "Credits", "Attendance %", "Grade (10-point)"]}
        rows={(data?.courseWise ?? []).map((c) => [c.name, c.credits, c.attendance, c.grade])}
      />
    </div>
  );
}
