"use client";

import ApiForm from "@/components/ApiForm";

export default function AttendancePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Attendance Tracker</h1>
      <ApiForm
        endpoint="/api/attendance"
        fields={[
          { name: "courseId", label: "Course ID", type: "number" },
          { name: "classesHeld", label: "Total Classes Held", type: "number" },
          { name: "classesAttended", label: "Classes Attended", type: "number" }
        ]}
      />
    </div>
  );
}
