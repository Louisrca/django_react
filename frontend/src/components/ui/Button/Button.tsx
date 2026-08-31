import { Slot } from "radix-ui";
import { type ButtonHTMLAttributes, type ElementType, type Ref } from "react";
import { cn } from "../../../utils/cn";

type Variant = "primary" | "secondary" | "neutral" | "navigation";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md " +
  "font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 " +
  "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
  "cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-slate-900 text-white hover:bg-slate-700",
  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
  neutral: "bg-white text-slate-900 hover:bg-slate-50",
  navigation: "bg-white text-slate-900 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
};

export const Button = ({
  variant = "primary",
  size = "md",
  asChild = false,
  className,
  type,
  ref,
  ...props
}: ButtonProps) => {
  const Comp: ElementType = asChild ? Slot.Root : "button";

  return (
    <Comp
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(asChild ? undefined : { type: type ?? "button" })}
      {...props}
    />
  );
};
