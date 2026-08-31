import { CheckCircle2, Flame, TriangleAlert, Zap } from "lucide-react";
import type { Client } from "@/types/clients";
import { Badge } from "@/components/ui/Badge/Badge";

type ClientBadgeRowProps = {
  data: Omit<Client, "id" | "full_name">;
};

export const ClientBadgeRow = ({ data }: ClientBadgeRowProps) => {
  return (
    <div className="flex flex-row gap-2">
      {data.has_elec_heating ? (
        <Badge variant="info" icon={Zap}>
          Électrique
        </Badge>
      ) : (
        <Badge variant="warning" icon={Flame}>
          Non électrique
        </Badge>
      )}
      {data.has_anomaly ? (
        <Badge variant="error" icon={TriangleAlert}>
          Anomalie détectée
        </Badge>
      ) : (
        <Badge variant="success" icon={CheckCircle2}>
          Aucune anomalie
        </Badge>
      )}
    </div>
  );
};
