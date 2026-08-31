import { TriangleAlert, Zap } from "lucide-react";
import { Badge } from "./Badge";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: Badge,
  args: {
    icon: Zap,
    children: "Default Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultWithoutIcon: Story = {
  args: {
    icon: undefined,
  },
};

export const Error: Story = {
  args: {
    icon: TriangleAlert,
    variant: "error",
    children: "Error Badge",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Info Badge",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning Badge",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success Badge",
  },
};
