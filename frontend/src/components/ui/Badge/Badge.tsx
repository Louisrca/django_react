import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

type Variant = "neutral" | "info" | "success" | "warning" | "error";

type BadgeProps = ComponentProps<"span"> & {
  variant?: Variant;
  icon?: LucideIcon;
};

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 " +
  "text-sm font-medium";

const variants: Record<Variant, string> = {
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  error: "border-red-200 bg-red-50 text-red-700",
};

export const Badge = ({
  variant = "neutral",
  icon: Icon,
  className,
  children,
  ...props
}: BadgeProps) => (
  <span
    className={`${base} ${variants[variant]} ${className ?? ""}`}
    {...props}
  >
    {Icon && <Icon className="size-3.5" />}
    {children}
  </span>
);
