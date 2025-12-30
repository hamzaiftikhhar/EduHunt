import { API_URL } from "@/lib/utils";

interface CourseFilters {
  search?: string;
  platform?: string;
  level?: string;
  page?: number;
  limit?: number;
}

export async function fetchCourses(filters: CourseFilters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.platform) params.append("platform", filters.platform);
    if (filters.level) params.append("level", filters.level);
    if (filters.page) params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));

    const response = await fetch(`${API_URL}/courses?${params.toString()}`, {
      cache: "revalidate",
      next: { revalidate: 3600 }, // revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw error;
  }
}

export async function fetchCourseById(id: string) {
  try {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      cache: "revalidate",
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch course:", error);
    throw error;
  }
}

interface ScholarshipFilters {
  search?: string;
  country?: string;
  page?: number;
  limit?: number;
}

export async function fetchScholarships(filters: ScholarshipFilters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.country) params.append("country", filters.country);
    if (filters.page) params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));

    const response = await fetch(`${API_URL}/scholarships?${params.toString()}`, {
      cache: "revalidate",
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch scholarships:", error);
    throw error;
  }
}
