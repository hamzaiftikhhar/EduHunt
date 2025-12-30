"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Loader } from "lucide-react";

interface Course {
  id: string;
  title: string;
  platform: string;
  level: string;
  description: string;
  url?: string;
  rating?: number;
}

export default function ExplorePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [platform, setPlatform] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement API call to backend
      console.log("Search:", searchQuery, "Platform:", platform);
      // const response = await fetchCourses({ search: searchQuery, platform });
      // setCourses(response.data || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-4xl font-bold text-slate-900">Explore Courses</h1>
          <p className="text-lg text-slate-600">
            Search and discover courses from top platforms worldwide
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-11 pr-4 text-slate-900 placeholder-slate-500 transition-colors hover:border-slate-400 focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 transition-colors hover:border-slate-400 focus:border-primary-500 focus:outline-none"
              >
                <option value="">All Platforms</option>
                <option value="coursera">Coursera</option>
                <option value="edx">edX</option>
                <option value="freecodecamp">freeCodeCamp</option>
                <option value="khan-academy">Khan Academy</option>
                <option value="youtube">YouTube</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-2 font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50"
              >
                {loading ? <Loader className="h-5 w-5 animate-spin" /> : <Filter className="h-5 w-5" />}
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : courses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Link key={course.id} href={`/course/${course.id}`}>
                  <div className="h-full rounded-lg border border-slate-200 p-6 transition-all hover:shadow-lg hover:border-primary-300">
                    <h3 className="mb-2 font-bold text-slate-900">{course.title}</h3>
                    <p className="mb-3 text-sm text-slate-600">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                        {course.platform}
                      </span>
                      {course.rating && (
                        <span className="text-sm font-medium text-yellow-600">
                          ⭐ {course.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
              <p className="text-lg text-slate-600">
                {searchQuery
                  ? "No courses found. Try a different search."
                  : "Start searching to discover courses."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
