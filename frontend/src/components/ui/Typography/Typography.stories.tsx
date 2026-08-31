import { Typography, type TypographyVariant } from "./Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";

/** Variant -> human-readable size / weight, shown next to each sample. */
const SPECS: Record<TypographyVariant, string> = {
  display: "48px · extrabold",
  h1: "36px · bold",
  h2: "30px · semibold",
  h3: "24px · semibold",
  h4: "18px · semibold",
  lead: "18px · normal",
  body: "16px · normal",
  "body-md": "14px · medium",
  "body-sm": "14px · normal",
  small: "12px · normal",
  overline: "12px · semibold · uppercase",
  caption: "12px · italic",
  label: "14px · medium",
  code: "14px · mono",
  blockquote: "16px · italic",
};

const VARIANTS = Object.keys(SPECS) as TypographyVariant[];

const meta = {
  component: Typography,
  args: {
    variant: "body",
    children: "The quick brown fox jumps over the lazy dog",
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    as: { table: { disable: true } },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          className="flex flex-col gap-1 border-b border-slate-100 pb-4"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="w-20">{variant}</span>
            <span>{SPECS[variant]}</span>
          </div>
          <div>
            {variant === "code" ? (
              <Typography variant="body">
                Appelle <Typography variant="code">useClient(id)</Typography>{" "}
                pour charger le client.
              </Typography>
            ) : (
              <Typography variant={variant}>
                The quick brown fox jumps over the lazy dog
              </Typography>
            )}
          </div>
        </div>
      ))}
    </div>
  ),
};
