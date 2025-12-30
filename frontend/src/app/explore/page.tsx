"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Loader } from "lucide-react";
import { useCourses } from "@/hooks";
import { CourseCard, Alert } from "@/components";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [platform, setPlatform] = useState("");
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch } = useCourses({
    search: searchQuery,
    platform,
    page,
    limit: 12,
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    await refetch();
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
          {error && (
            <div className="mb-6">
              <Alert variant="error" title="Error loading courses">
                {error.message}
              </Alert>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : data?.courses && data.courses.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-sm text-slate-600">
                  Found {data.total || 0} courses
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.courses.map((course: any) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    platform={course.platform}
                    description={course.description}
                    rating={course.rating}
                    level={course.level}
                    price={course.price}
                    instructor={course.instructor}
                  />
                ))}
              </div>
            </>
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
