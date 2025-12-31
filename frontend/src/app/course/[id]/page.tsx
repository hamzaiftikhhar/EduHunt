"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Clock, Users, BarChart3 } from "lucide-react";
import { useState } from "react";
import { use } from "react";

interface CourseDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CourseDetail({ params }: CourseDetailProps) {
  const { id } = use(params);
  const [isSaved, setIsSaved] = useState(false);

  // TODO: Fetch course data from API using id
  const course = {
    id: id,
    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.8,
    reviews: 1250000,
    price: "$99.99",
    level: "Beginner to Advanced",
    duration: "69 hours",
    students: "5.2M+",
    description:
      "Master JavaScript with the most complete course on the web. Build 15+ projects including a digital bank, game, and weather app. Learn ES6+, async/await, and modern JavaScript patterns.",
    highlights: [
      "69 hours of video content",
      "15+ real-world projects",
      "ES6+, async/await, OOP",
      "Downloadable resources",
      "30-day money-back guarantee",
    ],
    modules: [
      { name: "Introduction & Setup", lessons: 8 },
      { name: "JavaScript Fundamentals", lessons: 24 },
      { name: "DOM & Events", lessons: 18 },
      { name: "Advanced Concepts", lessons: 32 },
      { name: "Projects & Practice", lessons: 20 },
    ],
    url: "https://example.com/course",
    thumbnail: "https://via.placeholder.com/600x400?text=JavaScript+Course",
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/explore"
            className="mb-6 inline-flex items-center gap-2 text-primary-600 transition-colors hover:text-primary-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Courses
          </Link>
          <h1 className="mb-4 text-4xl font-bold text-slate-900">{course.title}</h1>
          <p className="text-lg text-slate-600">by {course.instructor}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Thumbnail */}
              <div className="overflow-hidden rounded-lg bg-slate-200">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-96 w-full object-cover"
                />
              </div>

              {/* Course Info */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Course Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Clock className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{course.duration}</p>
                        <p className="text-xs text-slate-500">Total Duration</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Users className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{course.students}</p>
                        <p className="text-xs text-slate-500">Students Enrolled</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-3 text-slate-600">
                      <BarChart3 className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{course.level}</p>
                        <p className="text-xs text-slate-500">Difficulty Level</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">⭐ {course.rating}/5.0</p>
                      <p className="text-xs text-slate-500">
                        {course.reviews.toLocaleString()} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">About This Course</h2>
                <p className="mb-6 text-lg text-slate-700">{course.description}</p>

                <h3 className="mb-4 text-xl font-bold text-slate-900">What You&apos;ll Learn</h3>
                <ul className="mb-6 space-y-3">
                  {course.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600">
                        ✓
                      </span>
                      <span className="text-slate-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Modules */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Course Curriculum</h2>
                <div className="space-y-2">
                  {course.modules.map((module, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-900">{module.name}</h4>
                        <span className="text-sm text-slate-500">{module.lessons} lessons</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                {/* Price Card */}
                <div className="rounded-lg border border-slate-200 bg-white p-6">
                  <p className="mb-4 text-3xl font-bold text-slate-900">{course.price}</p>
                  <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 font-semibold text-white transition-all hover:bg-primary-700">
                    <ExternalLink className="h-5 w-5" />
                    Enroll Now
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`w-full rounded-lg border-2 py-3 font-semibold transition-all ${
                      isSaved
                        ? "border-primary-600 bg-primary-50 text-primary-600"
                        : "border-slate-300 text-slate-700 hover:border-primary-600"
                    }`}
                  >
                    {isSaved ? "✓ Saved" : "Save for Later"}
                  </button>
                </div>

                {/* Platform Info */}
                <div className="rounded-lg border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 font-bold text-slate-900">Course Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs font-medium uppercase text-slate-500">Platform</p>
                      <p className="text-slate-900">{course.platform}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase text-slate-500">Instructor</p>
                      <p className="text-slate-900">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase text-slate-500">Language</p>
                      <p className="text-slate-900">English</p>
                    </div>
                  </div>
                </div>

                {/* Share */}
                <div className="rounded-lg border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 font-bold text-slate-900">Share</h3>
                  <div className="flex gap-3">
                    <button className="flex-1 rounded-lg bg-slate-100 py-2 text-center font-medium text-slate-700 transition-colors hover:bg-slate-200">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
