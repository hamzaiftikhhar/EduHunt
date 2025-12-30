import { useState, useEffect, useCallback } from "react";
import { API_URL } from "@/lib/utils";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface CourseFilters {
  search?: string;
  platform?: string;
  level?: string;
  page?: number;
  limit?: number;
}

export function useCourses(filters: CourseFilters = {}) {
  const [state, setState] = useState<FetchState<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchCourses = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.platform) params.append("platform", filters.platform);
      if (filters.level) params.append("level", filters.level);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));

      const response = await fetch(`${API_URL}/courses?${params.toString()}`, {
        cache: "revalidate",
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  }, [filters]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { ...state, refetch: fetchCourses };
}

export function useCourseDetail(id: string) {
  const [state, setState] = useState<FetchState<any>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await fetch(`${API_URL}/courses/${id}`, {
          cache: "revalidate",
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch course: ${response.status}`);
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error("Unknown error"),
        });
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  return state;
}

interface ScholarshipFilters {
  search?: string;
  country?: string;
  page?: number;
  limit?: number;
}

export function useScholarships(filters: ScholarshipFilters = {}) {
  const [state, setState] = useState<FetchState<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchScholarships = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
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
        throw new Error(`Failed to fetch scholarships: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
  }, [filters]);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  return { ...state, refetch: fetchScholarships };
}
