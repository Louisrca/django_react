import { Card } from "@/components/ui/Card/Card";
import { Typography } from "@/components/ui/Typography/Typography";
import type { Client } from "@/types/clients";
import { ChevronRight, Hash } from "lucide-react";
import { Link } from "react-router";
import { ClientBadgeRow } from "./ClientBadgeRow/ClientBadgeRow";

type ClientsCardListProps = {
  clients: Client[];
};

export const ClientsCardList = ({ clients }: ClientsCardListProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {clients.map((client) => (
        <li key={client.id}>
          <Link
            to={`/admin/clients/${client.id}`}
            className="block rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Card className="flex cursor-pointer flex-row items-center justify-between gap-3 hover:bg-accent">
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
          </Link>
        </li>
      ))}
    </ul>
  );
};
