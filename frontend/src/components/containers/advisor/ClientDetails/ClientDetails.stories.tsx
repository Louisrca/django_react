import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, within } from "storybook/test";
import type { ClientDetails as ClientDetailsData } from "@/types/clients";
import { ClientDetails } from "./ClientDetails";

const CLIENT_ID = 4242;

const consumptions = [
  { year: 2025, month: 1, kwh_consumed: 200 },
  { year: 2025, month: 2, kwh_consumed: 230 },
  { year: 2025, month: 3, kwh_consumed: 210 },
];

// Put the client's data straight into the React Query cache so `useClient()`
// serves it without any request — no API server and no MSW needed.
function withClient(data: ClientDetailsData): Decorator {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  queryClient.setQueryData(["clients", "detail", data.id, undefined], data);
  return (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
}

const meta = {
  component: ClientDetails,
  args: { clientId: CLIENT_ID },
} satisfies Meta<typeof ClientDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAnomaly: Story = {
  decorators: [
    withClient({
      id: CLIENT_ID,
      full_name: "Jean Dupont",
      has_elec_heating: true,
      has_anomaly: true,
      anomaly_date: { year: 2025, month: 7 },
      available_years: [2024, 2025],
      consumptions,
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // wait for the lazy chart to replace the loading skeleton
    await canvas.findByText("Jean Dupont");

    expect(canvas.getByText("Électrique")).toBeInTheDocument();
    expect(canvas.queryByText("Aucune anomalie")).not.toBeInTheDocument();
    expect(canvasElement.querySelector("canvas")).toBeInTheDocument();
  },
};

export const NoAnomaly: Story = {
  decorators: [
    withClient({
      id: CLIENT_ID,
      full_name: "Marie Martin",
      has_elec_heating: false,
      has_anomaly: false,
      anomaly_date: null,
      available_years: [2024, 2025],
      consumptions,
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText("Marie Martin");

    expect(canvas.getByText("Non électrique")).toBeInTheDocument();
    expect(canvas.getByText("Aucune anomalie")).toBeInTheDocument();
  },
};
