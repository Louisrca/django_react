import type { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type CardProps = ComponentProps<"div"> & {
  className?: string;
};

const base = "rounded-md border border-border-subtle p-4";

export const Card = ({ className, ...props }: CardProps) => {
  return <div className={cn(base, className)} {...props} />;
};
