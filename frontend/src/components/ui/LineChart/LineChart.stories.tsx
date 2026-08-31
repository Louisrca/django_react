import LineChart from "./LineChart";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: LineChart,
  args: {
    data: {
      labels: [
        "2026-1",
        "2026-2",
        "2026-3",
        "2026-5",
        "2026-6",
        "2026-7",
        "2026-8",
        "2026-9",
        "2026-10",
        "2026-11",
        "2026-12",
      ],
      datasets: [
        {
          label: "fake data",
          data: [
            103.5, 45.6, 132.76, 34.05, 234.01, 214.02, 98.32, 88.1, 74.32,
            21.23, 108.8, 128.07,
          ],
        },
      ],
    },
  },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
