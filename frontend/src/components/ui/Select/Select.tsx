import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export type SelectOption = {
  label: ReactNode;
  value: string | number;
};

type SelectProps = ComponentProps<"select"> & {
  options?: SelectOption[];
};

const base =
  "h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground " +
  "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export const Select = ({
  options,
  className,
  children,
  ...props
}: SelectProps) => (
  <select className={cn(base, className)} {...props}>
    {options
      ? options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      : children}
  </select>
);
