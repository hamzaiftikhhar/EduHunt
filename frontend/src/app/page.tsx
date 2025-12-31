import Link from "next/link";
import { Search, BookOpen, Award, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-slate-900">EduHunt</span>
          </div>
          <div className="hidden gap-8 md:flex">
            <Link
              href="/explore"
              className="text-slate-600 transition-colors hover:text-primary-600"
            >
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900 sm:text-6xl">
              Discover Your{" "}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Perfect Course
              </span>
            </h1>
            <p className="mb-8 text-xl text-slate-600">
              Explore thousands of courses from the world&apos;s best platforms. Find scholarships,
              free courses, and accelerate your learning journey.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Start Exploring
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary-600 px-8 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-50"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative h-96 w-full rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 p-8">
              <div className="space-y-4">
                <div className="h-4 rounded bg-primary-200" />
                <div className="h-4 rounded bg-secondary-200" />
                <div className="h-4 rounded bg-primary-100" />
                <div className="h-4 rounded bg-secondary-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">Why Choose EduHunt?</h2>
            <p className="text-xl text-slate-600">
              Everything you need to find, compare, and enroll in courses
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Search & Discover",
                description:
                  "Search across thousands of courses from Coursera, edX, MIT OpenCourseWare, and more.",
              },
              {
                icon: Award,
                title: "Find Scholarships",
                description:
                  "Discover funding opportunities and scholarships to support your learning goals.",
              },
              {
                icon: Users,
                title: "Compare & Review",
                description:
                  "Compare courses, read reviews, and make informed decisions about your education.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 p-8 transition-all hover:shadow-lg"
                >
                  <Icon className="mb-4 h-12 w-12 text-primary-600" />
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-12 text-center text-white">
          <h2 className="mb-4 text-4xl font-bold">Ready to Start Learning?</h2>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of learners exploring and discovering their next course.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-semibold text-primary-600 transition-all hover:shadow-lg"
          >
            <Search className="mr-2 h-5 w-5" />
            Explore Courses Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold">EduHunt</span>
              </div>
              <p className="text-sm text-slate-400">
                Your gateway to learning opportunities worldwide.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/explore" className="hover:text-white">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/scholarships" className="hover:text-white">
                    Scholarships
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <a href="https://github.com" className="hover:text-white">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 EduHunt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
