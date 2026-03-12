export const ATTENDANCE_THRESHOLD = 75;

export function attendancePercentage(held: number, attended: number): number {
  if (held <= 0) return 0;
  return Number(((attended / held) * 100).toFixed(2));
}

export function classesCanMiss(held: number, attended: number, threshold = ATTENDANCE_THRESHOLD): number {
  if (held <= 0) return 0;
  const maxAllowedAbsence = Math.floor(held * (1 - threshold / 100));
  const currentAbsence = held - attended;
  return Math.max(0, maxAllowedAbsence - currentAbsence);
}

export function weightedGpa(items: Array<{ grade: number; credits: number }>): number {
  const totalCredits = items.reduce((acc, item) => acc + item.credits, 0);
  if (totalCredits === 0) return 0;
  const weightedScore = items.reduce((acc, item) => acc + item.grade * item.credits, 0);
  return Number((weightedScore / totalCredits).toFixed(2));
}

export function marginDetails(params: {
  internalMarks: number;
  assignmentMarks: number;
  examMarks: number;
  totalMarks: number;
  targetMarks: number;
}) {
  const { internalMarks, assignmentMarks, examMarks, totalMarks, targetMarks } = params;
  const obtained = internalMarks + assignmentMarks + examMarks;
  const currentPercentage = totalMarks > 0 ? Number(((obtained / totalMarks) * 100).toFixed(2)) : 0;
  const marksNeeded = Math.max(0, Number((targetMarks - obtained).toFixed(2)));
  const performanceMargin = Number((obtained - targetMarks).toFixed(2));

  return { currentPercentage, marksNeeded, performanceMargin, obtained };
}
