import { useClients } from "@/api/clients";
import { ClientsCardList } from "@/components/containers/admin/ClientsCardList";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import { StatusText } from "@/components/ui/StatusText/StatusText";
import { Typography } from "@/components/ui/Typography/Typography";
import { useState } from "react";

export const Admin = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useClients(page);

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">Tous les clients</Typography>

      {isError && (
        <StatusText tone="error">
          Erreur lors du chargement des clients.
        </StatusText>
      )}

      {data && <ClientsCardList clients={data.clients} />}

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
