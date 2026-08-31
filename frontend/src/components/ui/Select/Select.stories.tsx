import { Select } from "./Select";
import type { Meta, StoryObj } from "@storybook/react-vite";

const options = [
  { label: "2020", value: 2020 },
  { label: "2021", value: 2021 },
  { label: "2022", value: 2022 },
  { label: "2023", value: 2023 },
];

const meta = {
  component: Select,
  args: {
    options: options,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
