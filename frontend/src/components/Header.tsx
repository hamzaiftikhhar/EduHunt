import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary-600" />
          <span className="text-2xl font-bold text-slate-900">EduHunt</span>
        </Link>

        <div className="hidden gap-8 md:flex">
          <Link href="/explore" className="text-slate-600 transition-colors hover:text-primary-600">
            Explore
          </Link>
          <Link
            href="/scholarships"
            className="text-slate-600 transition-colors hover:text-primary-600"
          >
            Scholarships
          </Link>
          <Link href="/about" className="text-slate-600 transition-colors hover:text-primary-600">
            About
          </Link>
        </div>

        <button className="rounded-lg bg-primary-600 px-6 py-2 text-white transition-colors hover:bg-primary-700">
          Sign In
        </button>
      </nav>
    </header>
  );
}
