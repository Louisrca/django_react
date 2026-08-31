import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClientBadgeRow } from "@/components/containers/admin/ClientBadgeRow/ClientBadgeRow";

const meta = {
  component: ClientBadgeRow,
  args: {
    data: {
      has_anomaly: false,
      has_elec_heating: true,
    },
  },
} satisfies Meta<typeof ClientBadgeRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHasAnomaly: Story = {
  args: {
    data: {
      has_anomaly: true,
      has_elec_heating: true,
    },
  },
};
export const WithHasNotElecHeating: Story = {
  args: {
    data: {
      has_anomaly: false,
      has_elec_heating: false,
    },
  },
};

export const WithHasAnomalyAndHasNotElecHeating: Story = {
  args: {
    data: {
      has_anomaly: true,
      has_elec_heating: false,
    },
  },
};
