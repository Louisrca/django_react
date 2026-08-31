import { ClientDetailsSkeleton } from "./ClientDetailsSkeleton";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Containers/ClientDetailsSkeleton",
  component: ClientDetailsSkeleton,
} satisfies Meta<typeof ClientDetailsSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
