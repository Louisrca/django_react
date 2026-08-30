import { Input } from "./Input";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    label: "Label",
    placeholder: "Saisir du texte",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = {
  args: {
    required: true,
  },
};
