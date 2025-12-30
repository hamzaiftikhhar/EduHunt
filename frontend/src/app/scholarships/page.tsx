"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Loader, Award } from "lucide-react";

interface Scholarship {
  id: string;
  title: string;
  amount?: string;
  country?: string;
  description: string;
  url?: string;
  deadline?: string;
}

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement API call to backend
      console.log("Search scholarships:", searchQuery, "Country:", country);
      // const response = await fetchScholarships({ search: searchQuery, country });
      // setScholarships(response.data || []);
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
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-secondary-600" />
            <h1 className="text-4xl font-bold text-slate-900">Scholarships</h1>
          </div>
          <p className="text-lg text-slate-600">
            Find funding opportunities to support your education
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
                    placeholder="Search scholarships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-11 pr-4 text-slate-900 placeholder-slate-500 transition-colors hover:border-slate-400 focus:border-secondary-500 focus:outline-none"
                  />
                </div>
              </div>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 transition-colors hover:border-slate-400 focus:border-secondary-500 focus:outline-none"
              >
                <option value="">All Countries</option>
                <option value="international">International</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-secondary-600 px-6 py-2 font-semibold text-white transition-all hover:bg-secondary-700 disabled:opacity-50"
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
              <Loader className="h-8 w-8 animate-spin text-secondary-600" />
            </div>
          ) : scholarships.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {scholarships.map((scholarship) => (
                <a
                  key={scholarship.id}
                  href={scholarship.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="h-full rounded-lg border border-slate-200 p-6 transition-all hover:shadow-lg hover:border-secondary-300">
                    <h3 className="mb-2 font-bold text-slate-900">{scholarship.title}</h3>
                    <p className="mb-3 text-sm text-slate-600">{scholarship.description}</p>
                    <div className="space-y-2 text-sm">
                      {scholarship.amount && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-secondary-600">Amount:</span>
                          <span className="text-slate-600">{scholarship.amount}</span>
                        </div>
                      )}
                      {scholarship.deadline && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-600">Deadline:</span>
                          <span className="text-slate-600">{scholarship.deadline}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
              <p className="text-lg text-slate-600">
                {searchQuery
                  ? "No scholarships found. Try a different search."
                  : "Start searching to find funding opportunities."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
