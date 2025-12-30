import { ReactNode } from "react";

interface SkipLinkProps {
  href: string;
  children: ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="absolute left-0 top-0 z-50 -translate-y-full bg-primary-600 px-6 py-2 text-white focus:translate-y-0"
    >
      {children}
    </a>
  );
}
