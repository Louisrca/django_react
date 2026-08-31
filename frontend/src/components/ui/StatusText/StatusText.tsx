import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const statusTextVariants = cva("mt-2 text-sm", {
  variants: {
    tone: {
      muted: "text-muted-foreground",
      error: "text-destructive",
    },
  },
  defaultVariants: { tone: "muted" },
});

type StatusTextProps = ComponentProps<"p"> &
  VariantProps<typeof statusTextVariants>;

export const StatusText = ({ tone, className, ...props }: StatusTextProps) => (
  <p className={cn(statusTextVariants({ tone }), className)} {...props} />
);
