import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};
export const Neutral: Story = {
  args: {
    variant: "neutral",
  },
};
