"use client";

import Link from "next/link";
import { signInWithGoogle, signInWithGitHub } from "@/lib/auth-actions";
import { Github, Mail } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your EduHunt account</p>
        </div>

        <div className="space-y-4">
          <form action={signInWithGoogle}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-900 transition-all hover:bg-slate-50"
            >
              <Mail className="h-5 w-5" />
              Sign in with Google
            </button>
          </form>

          <form action={signInWithGitHub}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-900 transition-all hover:bg-slate-50"
            >
              <Github className="h-5 w-5" />
              Sign in with GitHub
            </button>
          </form>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6 text-center">
          <p className="text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="font-medium text-primary-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
