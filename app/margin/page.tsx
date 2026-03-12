"use client";

import ApiForm from "@/components/ApiForm";

export default function MarginPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Margin Calculator</h1>
      <ApiForm
        endpoint="/api/margin"
        fields={[
          { name: "courseId", label: "Course ID", type: "number" },
          { name: "internalMarks", label: "Internal Marks", type: "number" },
          { name: "assignmentMarks", label: "Assignment Marks", type: "number" },
          { name: "examMarks", label: "Exam Marks", type: "number" },
          { name: "totalMarks", label: "Total Possible Marks", type: "number" },
          { name: "targetMarks", label: "Target Score", type: "number" }
        ]}
      />
    </div>
  );
}
