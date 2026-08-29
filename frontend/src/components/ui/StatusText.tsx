import type { ComponentProps } from "react";

type StatusTextProps = ComponentProps<"p"> & {
  tone?: "muted" | "error";
};

const tones = {
  muted: "text-slate-500",
  error: "text-red-600",
} as const;

export const StatusText = ({
  tone = "muted",
  className,
  ...props
}: StatusTextProps) => (
  <p className={`mt-2 text-sm ${tones[tone]} ${className ?? ""}`} {...props} />
);
