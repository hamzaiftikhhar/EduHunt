"use client";

import Link from "next/link";
import { use } from "react";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = use(searchParams);
  const error = params.error || "Authentication failed";

  const errorMessages: Record<string, string> = {
    OAuthSignin: "There was a problem signing in with OAuth.",
    OAuthCallback: "There was a problem with the OAuth callback.",
    EmailCreateAccount: "Could not create user account with the email provider.",
    EmailSignInError: "Could not sign in with the email provider.",
    CredentialsSignin: "Sign in with credentials failed. Check that your details are correct.",
    SessionCallback: "There was a problem updating your session.",
    default: "An unexpected error occurred during authentication.",
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <div className="text-2xl">⚠️</div>
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-red-900">Authentication Error</h1>
          <p className="text-red-700">
            {errorMessages[error as keyof typeof errorMessages] || errorMessages.default}
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/auth/signin" className="block">
            <button className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-all hover:bg-primary-700">
              Try Again
            </button>
          </Link>
          <Link href="/" className="block">
            <button className="w-full rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-900 transition-all hover:bg-slate-50">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
