import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 " +
    "text-sm font-medium",
  {
    variants: {
      variant: {
        neutral: "border-border bg-accent text-body",
        info: "border-info-border bg-info-surface text-info",
        success: "border-success-border bg-success-surface text-success",
        warning: "border-warning-border bg-warning-surface text-warning",
        error: "border-error-border bg-error-surface text-error",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    icon?: LucideIcon;
    showLabel?: boolean | "sm";
  };

export const Badge = ({
  variant,
  icon: Icon,
  showLabel,
  className,
  children,
  ...props
}: BadgeProps) => {
  const visibility = showLabel ?? (Icon ? "sm" : true);

  const labelClassName =
    visibility === true
      ? undefined
      : visibility === false
        ? "sr-only"
        : "sr-only sm:not-sr-only";

  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {Icon && <Icon className="size-3.5" />}
      <span className={labelClassName}>{children}</span>
    </span>
  );
};
