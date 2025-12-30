export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-slate-200 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">About EduHunt</h1>
          <p className="text-xl text-slate-600">
            Empowering learners worldwide to discover, compare, and access quality education.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-lg text-slate-700">
              EduHunt is dedicated to democratizing education by making it easier for learners
              worldwide to discover quality courses and funding opportunities. We aggregate courses
              from the best platforms, including Coursera, edX, MIT OpenCourseWare, Khan Academy,
              freeCodeCamp, and more.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">What We Do</h2>
            <ul className="space-y-4 text-lg text-slate-700">
              <li className="flex gap-4">
                <span className="flex-shrink-0 text-primary-600 font-bold">✓</span>
                <span>Aggregate and search thousands of courses from top platforms</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 text-primary-600 font-bold">✓</span>
                <span>Help you find scholarships and funding opportunities</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 text-primary-600 font-bold">✓</span>
                <span>Compare courses by ratings, difficulty, and duration</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 text-primary-600 font-bold">✓</span>
                <span>Save your favorite courses and create learning paths</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Supported Platforms</h2>
            <p className="mb-6 text-lg text-slate-700">
              We currently index courses from these major platforms:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Coursera", "edX", "MIT OpenCourseWare", "Khan Academy", "freeCodeCamp", "YouTube", "Microsoft Learn"].map((platform) => (
                <div
                  key={platform}
                  className="rounded-lg border border-slate-200 p-4 text-center font-medium text-slate-900"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-primary-50 p-8 border border-primary-200">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Get Started Today</h2>
            <p className="text-lg text-slate-700 mb-6">
              Ready to find your next course or scholarship? Explore our platform and discover
              learning opportunities tailored to your interests and goals.
            </p>
            <a
              href="/explore"
              className="inline-block rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
