import { CheckCircle2, Flame, TriangleAlert, Zap } from "lucide-react";
import { useState } from "react";
import { useClients } from "../api/clients";
import { Badge } from "../components/ui/Badge/Badge";
import { Card } from "../components/ui/Card/Card";
import { Pagination } from "../components/ui/Pagination/Pagination";
import { StatusText } from "../components/ui/StatusText/StatusText";
import { ClientBadgeRow } from "../components/containers/admin/ClientBadgeRow";

export const Admin = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useClients(page);
  console.log("🚀 ~ Admin ~ data:", data);

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
            <Card>
              <li key={client.id} className="flex flex-row justify-between ">
                <span>{client.full_name}</span>
                <ClientBadgeRow data={client} />
              </li>
            </Card>
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
