import { ClientBadgeRow } from "@/components/containers/admin/ClientBadgeRow";
import { Card } from "./Card";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: Card,
  args: {
    children: (
      <div className="flex flex-row justify-between gap-2">
        <span className="font-medium">Michel Cymes</span>
        <ClientBadgeRow data={{ has_elec_heating: true, has_anomaly: false }} />
      </div>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
