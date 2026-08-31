import type { ComponentProps, ElementType } from "react";

export type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "lead"
  | "body"
  | "body-md"
  | "body-sm"
  | "small"
  | "overline"
  | "caption"
  | "label"
  | "code"
  | "blockquote";

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

const styles: Record<TypographyVariant, string> = {
  display: "text-5xl font-extrabold tracking-tight text-slate-900",
  h1: "text-4xl font-bold tracking-tight text-slate-900",
  h2: "text-3xl font-semibold tracking-tight text-slate-900",
  h3: "text-2xl font-semibold text-slate-900",
  h4: "text-lg font-semibold text-slate-900",
  lead: "text-lg font-normal text-slate-600",
  body: "text-base font-normal text-slate-700",
  "body-md": "text-base font-medium text-slate-600",
  "body-sm": "text-sm font-normal text-slate-600",
  small: "text-xs font-normal text-slate-500",
  overline: "text-xs font-semibold uppercase tracking-widest text-slate-500",
  caption: "text-xs font-normal italic text-slate-500",
  label: "text-sm font-medium text-slate-700",
  code: "flex items-center font-mono text-sm rounded bg-slate-100 px-1.5 py-0.5 text-slate-800 ",
  blockquote:
    "border-l-2 border-slate-300 pl-4 text-base italic text-slate-600",
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
    <Component className={`${styles[variant]} ${className ?? ""}`} {...props} />
  );
};
