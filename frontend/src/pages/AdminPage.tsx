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
  console.log("🚀 ~ Admin ~ data:", data);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 mb-18">
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
                className="flex cursor-pointer flex-row justify-between hover:bg-slate-50"
              >
                <div className="flex flex-row gap-4">
                  <Typography
                    variant="code"
                    className="flex flex-row items-center gap-1"
                  >
                    <Hash className="size-4 text-slate-500" />
                    {client.id}
                  </Typography>
                  <Typography variant="body">{client.full_name}</Typography>
                </div>
                <div className="flex flex-row gap-4">
                  <ClientBadgeRow data={client} />
                  <ChevronRight color={"#B9BBC6"} />
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
