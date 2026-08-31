import type { SearchClientsResponse } from "../../../types/clients";
import { Button } from "../../ui/Button/Button";

type ClientsListProps = {
  data: SearchClientsResponse;
  onSelect: (id: number) => void;
};

export const ClientsList = ({ data, onSelect }: ClientsListProps) => (
  <ul className="mt-2 divide-y divide-border rounded-md border border-border">
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
