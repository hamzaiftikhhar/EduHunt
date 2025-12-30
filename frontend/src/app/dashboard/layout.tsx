import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Heart, Settings, LogOut } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white">
        <div className="p-6">
          <h2 className="text-lg font-bold text-slate-900">Dashboard</h2>
        </div>

        <nav className="space-y-2 px-4 py-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 transition-colors hover:bg-slate-50"
          >
            <BookOpen className="h-5 w-5" />
            <span className="font-medium">My Learning</span>
          </Link>
          <Link
            href="/dashboard/wishlist"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Heart className="h-5 w-5" />
            <span className="font-medium">Wishlist</span>
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="border-t border-slate-200 px-4 py-6">
          <div className="mb-4 rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase text-slate-600">Signed in as</p>
            <p className="mt-1 font-medium text-slate-900">{session.user?.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              // TODO: Implement sign out
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-slate-700 transition-colors hover:bg-slate-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
