import type { ComponentProps, ReactNode } from "react";

export type SelectOption = {
  label: ReactNode;
  value: string | number;
};

type SelectProps = ComponentProps<"select"> & {
  options?: SelectOption[];
};

const base =
  "h-9 rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-900 " +
  "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-slate-900 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export const Select = ({
  options,
  className,
  children,
  ...props
}: SelectProps) => (
  <select className={`${base} ${className ?? ""}`} {...props}>
    {options
      ? options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      : children}
  </select>
);
