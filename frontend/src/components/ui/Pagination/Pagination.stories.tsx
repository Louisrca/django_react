import { type ComponentProps, useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
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

const getPageInput = (canvasElement: HTMLElement) =>
  within(canvasElement).getByRole("spinbutton", { name: "Aller à la page" });

export const Default: Story = {};

export const FirstPage: Story = {
  args: { page: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("button", { name: "Première page" })).toBeDisabled();
    expect(
      canvas.getByRole("button", { name: "Page précédente" }),
    ).toBeDisabled();
    expect(canvas.getByRole("button", { name: "Page suivante" })).toBeEnabled();
  },
};

export const LastPage: Story = {
  args: { page: 500 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("button", { name: "Page suivante" })).toBeDisabled();
    expect(canvas.getByRole("button", { name: "Dernière page" })).toBeDisabled();
  },
};

export const SinglePage: Story = {
  args: { page: 1, pageCount: 1 },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    expect(getPageInput(canvasElement)).toBeDisabled();
    expect(
      within(canvasElement).getByRole("button", { name: "Page suivante" }),
    ).toBeDisabled();
  },
};

// Typing a page number and pressing Enter navigates — but nothing fires while typing.
export const JumpByTyping: Story = {
  play: async ({ args, canvasElement }) => {
    const input = getPageInput(canvasElement);
    await userEvent.clear(input);
    await userEvent.type(input, "42");
    expect(args.onPageChange).not.toHaveBeenCalled();
    await userEvent.keyboard("{Enter}");
    expect(args.onPageChange).toHaveBeenCalledWith(42);
  },
};

// Leaving the field (blur) also commits the typed value.
export const CommitsOnBlur: Story = {
  play: async ({ args, canvasElement }) => {
    const input = getPageInput(canvasElement);
    await userEvent.clear(input);
    await userEvent.type(input, "128");
    await userEvent.tab();
    expect(args.onPageChange).toHaveBeenCalledWith(128);
  },
};

export const ClampsAboveMax: Story = {
  play: async ({ args, canvasElement }) => {
    const input = getPageInput(canvasElement);
    await userEvent.clear(input);
    await userEvent.type(input, "9999");
    await userEvent.keyboard("{Enter}");
    expect(args.onPageChange).toHaveBeenCalledWith(500);
    expect(input).toHaveValue(500);
  },
};

export const ClampsBelowMin: Story = {
  play: async ({ args, canvasElement }) => {
    const input = getPageInput(canvasElement);
    await userEvent.clear(input);
    await userEvent.type(input, "0");
    await userEvent.keyboard("{Enter}");
    expect(args.onPageChange).toHaveBeenCalledWith(1);
  },
};

// An empty or non-numeric entry is discarded and the field snaps back to the current page.
export const InvalidResetsToCurrentPage: Story = {
  args: { page: 7 },
  play: async ({ args, canvasElement }) => {
    const input = getPageInput(canvasElement);
    await userEvent.clear(input);
    await userEvent.keyboard("{Enter}");
    expect(args.onPageChange).not.toHaveBeenCalled();
    expect(input).toHaveValue(7);
  },
};

export const FirstAndLastButtons: Story = {
  args: { page: 250 },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Dernière page" }));
    expect(args.onPageChange).toHaveBeenCalledWith(500);
    await userEvent.click(canvas.getByRole("button", { name: "Première page" }));
    expect(args.onPageChange).toHaveBeenCalledWith(1);
  },
};

// Buttons and the input actually change the page, like in a real app.
const InteractivePagination = (args: ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.page);
  return <Pagination {...args} page={page} onPageChange={setPage} />;
};

export const Interactive: Story = {
  render: (args) => <InteractivePagination {...args} />,
};
