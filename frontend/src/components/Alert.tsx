import { ReactNode } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

interface AlertProps {
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  dismissible?: boolean;
  onDismiss?: () => void;
  title?: string;
}

const variantConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-50",
    border: "border-blue-200",
    title: "text-blue-900",
    text: "text-blue-800",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-green-50",
    border: "border-green-200",
    title: "text-green-900",
    text: "text-green-800",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    title: "text-yellow-900",
    text: "text-yellow-800",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-red-50",
    border: "border-red-200",
    title: "text-red-900",
    text: "text-red-800",
  },
};

export function Alert({
  children,
  variant = "info",
  dismissible = false,
  onDismiss,
  title,
}: AlertProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={`rounded-lg border ${config.bg} ${config.border} p-4`}>
      <div className="flex gap-4">
        <Icon className={`h-5 w-5 flex-shrink-0 ${config.title}`} />
        <div className="flex-1">
          {title && <h3 className={`font-semibold ${config.title}`}>{title}</h3>}
          <div className={`${title ? "mt-1" : ""} ${config.text}`}>{children}</div>
        </div>
        {dismissible && (
          <button onClick={onDismiss} className={`flex-shrink-0 ${config.title} hover:opacity-70`}>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
