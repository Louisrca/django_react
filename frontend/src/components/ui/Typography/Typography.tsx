import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ElementType } from "react";
import { cn } from "@/utils/cn";

const typographyVariants = cva("", {
  variants: {
    variant: {
      display: "text-5xl font-extrabold tracking-tight text-brand",
      h1: "text-4xl font-bold tracking-tight text-brand",
      h2: "text-3xl font-semibold tracking-tight text-brand",
      h3: "text-2xl font-semibold text-brand",
      h4: "text-lg font-semibold text-brand",
      lead: "text-lg font-normal text-body-muted",
      body: "text-base font-normal text-body",
      "body-md": "text-base font-medium text-body-muted",
      "body-sm": "text-sm font-normal text-body-muted",
      small: "text-xs font-normal text-muted-foreground",
      overline:
        "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
      caption: "text-xs font-normal italic text-muted-foreground",
      label: "text-sm font-medium text-body",
      code: "flex items-center font-mono text-sm rounded bg-muted px-1.5 py-0.5 text-foreground",
      blockquote:
        "border-l-2 border-border-strong pl-4 text-base italic text-body-muted",
    },
  },
  defaultVariants: { variant: "body" },
});

export type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>;

/** DOM element rendered per variant (override with `as` when you need a
 *  different tag, e.g. an <h2> that looks like the h1 style). */
const element: Record<TypographyVariant, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  body: "p",
  "body-md": "p",
  "body-sm": "p",
  small: "p",
  overline: "span",
  caption: "span",
  label: "span",
  code: "code",
  blockquote: "blockquote",
};

type TypographyProps = ComponentProps<"p"> & {
  /**
   * Text style to apply. Also picks the default HTML tag.
   *
   * Headings: `display` `h1` `h2` `h3` `h4` — Text: `lead` `body` (default)
   * `body-sm` `small` — Accents: `overline` `caption` `label` `code`
   * `blockquote`
   *
   * @default "body"
   */
  variant?: TypographyVariant;
  /**
   * Override the rendered element, keeping the variant's styling.
   * @example <Typography variant="h1" as="h2">Looks like h1, is an h2</Typography>
   */
  as?: ElementType;
};

export const Typography = ({
  variant = "body",
  as,
  className,
  ...props
}: TypographyProps) => {
  const Component = as ?? element[variant];
  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
};
