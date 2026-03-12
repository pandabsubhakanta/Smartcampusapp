import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Student Academic Tracker</h1>
      <p className="max-w-2xl text-slate-300">
        Manage attendance, calculate margin targets, and monitor weighted GPA with a clean 10-point academic dashboard.
      </p>
      <div className="flex gap-3">
        <Link href="/register" className="bg-indigo-600 text-white">
          Get Started
        </Link>
        <Link href="/dashboard" className="border border-slate-600 text-slate-200">
          View Dashboard
        </Link>
      </div>
    </section>
  );
}
