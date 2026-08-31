import { useState } from "react";
import { useClients } from "../api/clients";
import { ClientBadgeRow } from "../components/containers/admin/ClientBadgeRow";
import { Card } from "../components/ui/Card/Card";
import { Pagination } from "../components/ui/Pagination/Pagination";
import { StatusText } from "../components/ui/StatusText/StatusText";
import { useNavigate } from "react-router";

export const Admin = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useClients(page);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <h1>Clients</h1>

      {isError && (
        <StatusText tone="error">
          Erreur lors du chargement des clients.
        </StatusText>
      )}

      {data && (
        <ul className="flex flex-col gap-2">
          {data.clients.map((client) => (
            <li key={client.id}>
              <Card
                onClick={() => navigate(`/admin/clients/${client.id}`)}
                className="flex cursor-pointer flex-row justify-between"
              >
                <span>{client.full_name}</span>
                <ClientBadgeRow data={client} />
              </Card>
            </li>
          ))}
        </ul>
      )}

      {data && (
        <Pagination
          page={data.page}
          pageCount={data.page_count}
          onPageChange={setPage}
          disabled={isPending}
        />
      )}
    </div>
  );
};
