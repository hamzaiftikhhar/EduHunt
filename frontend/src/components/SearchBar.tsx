import { Search, X } from "lucide-react";
import { ReactNode } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  loading?: boolean;
  children?: ReactNode;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  loading = false,
  children,
}: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading}
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-11 pr-12 text-slate-900 placeholder-slate-500 transition-colors hover:border-slate-400 focus:border-primary-500 focus:outline-none disabled:opacity-50"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {children}
    </form>
  );
}
