import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  platform: string;
  description: string;
  rating?: number;
  level?: string;
  price?: string;
  instructor?: string;
}

export function CourseCard({
  id,
  title,
  platform,
  description,
  rating,
  level,
  price,
  instructor,
}: CourseCardProps) {
  return (
    <Link href={`/course/${id}`}>
      <div className="h-full rounded-lg border border-slate-200 p-6 transition-all hover:shadow-lg hover:border-primary-300">
        <h3 className="mb-2 line-clamp-2 font-bold text-slate-900">{title}</h3>
        {instructor && <p className="mb-3 text-sm text-slate-500">by {instructor}</p>}
        <p className="mb-4 line-clamp-2 text-sm text-slate-600">{description}</p>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
            {platform}
          </span>
          <div className="flex items-center gap-4 text-sm">
            {rating && <span className="font-medium text-yellow-600">⭐ {rating}</span>}
            {price && <span className="font-bold text-slate-900">{price}</span>}
          </div>
        </div>

        {level && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs font-medium text-slate-500 uppercase">{level}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
