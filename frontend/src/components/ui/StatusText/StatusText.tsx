import type { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type StatusTextProps = ComponentProps<"p"> & {
  tone?: "muted" | "error";
};

const tones = {
  muted: "text-muted-foreground",
  error: "text-destructive",
} as const;

export const StatusText = ({
  tone = "muted",
  className,
  ...props
}: StatusTextProps) => (
  <p className={cn("mt-2 text-sm", tones[tone], className)} {...props} />
);
