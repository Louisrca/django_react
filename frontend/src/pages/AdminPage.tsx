import { ChevronRight, Hash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useClients } from "../api/clients";
import { ClientBadgeRow } from "../components/containers/admin/ClientBadgeRow";
import { Card } from "../components/ui/Card/Card";
import { Pagination } from "../components/ui/Pagination/Pagination";
import { StatusText } from "../components/ui/StatusText/StatusText";
import { Typography } from "../components/ui/Typography/Typography";

export const Admin = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useClients(page);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">Tous les clients</Typography>

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
                className="flex cursor-pointer flex-row items-center justify-between gap-3 hover:bg-accent"
              >
                <div className="flex min-w-0 flex-row items-center gap-2 sm:gap-4">
                  <Typography
                    variant="code"
                    className="flex shrink-0 flex-row items-center gap-1"
                  >
                    <Hash className="size-4 shrink-0 text-muted-foreground" />
                    {client.id}
                  </Typography>
                  <Typography variant="body" className="truncate">
                    {client.full_name}
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-row items-center gap-2 sm:gap-4">
                  <ClientBadgeRow data={client} />
                  <ChevronRight className="shrink-0 text-faint" />
                </div>
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
