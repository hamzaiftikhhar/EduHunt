import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "EduHunt - Discover Your Perfect Course",
  description:
    "Find and compare courses from the world's best platforms. Free courses, scholarships, and learning opportunities.",
  keywords: "courses, scholarships, learning, free courses, online education, skill development",
  authors: [{ name: "EduHunt Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eduhunt.app",
    title: "EduHunt - Discover Your Perfect Course",
    description:
      "Find and compare courses from the world's best platforms. Free courses, scholarships, and learning opportunities.",
    images: [{ url: "https://eduhunt.app/og-image.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
