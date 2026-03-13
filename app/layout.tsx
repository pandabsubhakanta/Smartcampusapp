import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Academic Tracker",
  description: "Track attendance, grades, and margin targets"
};

const navItems = [
  ["Dashboard", "/dashboard"],
  ["Courses", "/courses"],
  ["Attendance", "/attendance"],
  ["GPA", "/gpa"],
  ["Margin", "/margin"]
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800 bg-slate-900/80">
          <nav className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6 py-4">
            <Link href="/" className="mr-6 font-semibold">
              Academic Tracker
            </Link>
            {navItems.map(([name, path]) => (
              <Link key={path} href={path} className="text-sm text-slate-300 hover:text-white">
                {name}
              </Link>
            ))}
            <div className="ml-auto flex gap-2">
              <Link href="/login" className="text-sm text-slate-300">
                Login
              </Link>
              <Link href="/register" className="text-sm text-slate-300">
                Register
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
