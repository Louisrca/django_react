import type { SearchClientsResponse } from "../types/clients";
import { Button } from "./ui/Button";

type ClientsListProps = {
  data: SearchClientsResponse;
  onSelect: (id: number) => void;
};

export const ClientsList = ({ data, onSelect }: ClientsListProps) => (
  <ul className="mt-2 divide-y divide-slate-200 rounded-md border border-slate-200">
    {data.clients.map((client) => (
      <li key={client.id}>
        <Button
          onClick={() => onSelect(client.id)}
          className="w-full justify-start"
          variant="neutral"
          aria-label={client.full_name}
        >
          {client.full_name}
        </Button>
      </li>
    ))}
  </ul>
);
