import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type Variant = "neutral" | "info" | "success" | "warning" | "error";

type BadgeProps = ComponentProps<"span"> & {
  variant?: Variant;
  icon?: LucideIcon;
};

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 " +
  "text-sm font-medium";

const variants: Record<Variant, string> = {
  neutral: "border-border bg-accent text-body",
  info: "border-info-border bg-info-surface text-info",
  success: "border-success-border bg-success-surface text-success",
  warning: "border-warning-border bg-warning-surface text-warning",
  error: "border-error-border bg-error-surface text-error",
};

export const Badge = ({
  variant = "neutral",
  icon: Icon,
  className,
  children,
  ...props
}: BadgeProps) => (
  <span className={cn(base, variants[variant], className)} {...props}>
    {Icon && <Icon className="size-3.5" />}
    <span className={Icon ? "sr-only sm:not-sr-only" : undefined}>
      {children}
    </span>
  </span>
);
