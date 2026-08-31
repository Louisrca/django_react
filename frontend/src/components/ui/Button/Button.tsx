import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, type ElementType, type Ref } from "react";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md " +
    "font-medium transition-colors cursor-pointer " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "border border-input bg-background text-foreground hover:bg-accent",
        neutral: "bg-background text-foreground hover:bg-accent",
        "full-neutral": "bg-background text-foreground hover:bg-accent",
        navigation:
          "bg-background text-foreground hover:text-brand hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    ref?: Ref<HTMLButtonElement>;
  };

export const Button = ({
  variant,
  size,
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
      className={cn(buttonVariants({ variant, size }), className)}
      {...(asChild ? undefined : { type: type ?? "button" })}
      {...props}
    />
  );
};
