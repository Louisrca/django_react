import { useState } from "react";
import { fn } from "storybook/test";
import { Pagination } from "./Pagination";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: Pagination,
  args: {
    page: 3,
    pageCount: 500,
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstPage: Story = {
  args: { page: 1 },
};

export const LastPage: Story = {
  args: { page: 500 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const SinglePage: Story = {
  args: { page: 1, pageCount: 1 },
};

// Buttons actually change the page, like in a real app.
export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};
