import { StatusText } from "./StatusText";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "UI/StatusText",
  component: StatusText,
  args: {
    children: "Recherche...",
  },
} satisfies Meta<typeof StatusText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = {
  args: {
    tone: "error",
    children: "Erreur lors de la recherche.",
  },
};
