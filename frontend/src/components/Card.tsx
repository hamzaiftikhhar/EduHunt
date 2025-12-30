import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = false }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-6 ${
        hoverable ? "transition-all hover:shadow-lg" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardProps) {
  return (
    <div className={`border-b border-slate-200 pb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "" }: CardProps) {
  return <div className={`py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardProps) {
  return (
    <div className={`border-t border-slate-200 pt-4 ${className}`}>
      {children}
    </div>
  );
}
