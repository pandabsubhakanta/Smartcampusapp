"use client";

import { useEffect, useState } from "react";

type Course = { id: number; name: string; credits: number; gradingScheme: string };

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState("");
  const [credits, setCredits] = useState(3);

  const load = () => fetch("/api/courses").then((r) => r.json()).then(setCourses);
  useEffect(() => {
    load();
  }, []);

  async function addCourse(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, credits, gradingScheme: "10-point" })
    });
    setName("");
    setCredits(3);
    load();
  }

  async function remove(id: number) {
    await fetch(`/api/courses?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Course Management</h1>
      <form onSubmit={addCourse} className="grid gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4 md:grid-cols-3">
        <input placeholder="Course name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" min={1} value={credits} onChange={(e) => setCredits(Number(e.target.value))} required />
        <button className="bg-indigo-600 text-white" type="submit">
          Add Course
        </button>
      </form>

      <div className="space-y-2">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center justify-between rounded border border-slate-800 bg-slate-900 p-3">
            <div>
              <p>{course.name}</p>
              <p className="text-sm text-slate-400">
                Credits: {course.credits} • Scheme: {course.gradingScheme}
              </p>
            </div>
            <button className="bg-rose-600 text-white" onClick={() => remove(course.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
