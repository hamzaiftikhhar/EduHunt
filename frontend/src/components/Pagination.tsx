import { ReactNode } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition-colors hover:border-primary-600 hover:text-primary-600 disabled:opacity-50"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..." || loading}
            className={`px-3 py-2 rounded-lg transition-colors ${
              page === currentPage
                ? "bg-primary-600 text-white"
                : page === "..."
                  ? "cursor-default text-slate-500"
                  : "border border-slate-300 text-slate-700 hover:border-primary-600 hover:text-primary-600"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition-colors hover:border-primary-600 hover:text-primary-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
