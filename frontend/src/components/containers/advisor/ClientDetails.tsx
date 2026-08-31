import { lazy, Suspense, useMemo } from "react";
import { useClient } from "../../../api/clients";
import { ClientDetailsSkeleton } from "./ClientDetailsSkeleton/ClientDetailsSkeleton";
import { StatusText } from "../../ui/StatusText/StatusText";
import { User, Hash, Zap, Flame } from "lucide-react";

type ClientDetailsProps = {
  clientId: number;
};

const LineChart = lazy(() => import("../../ui/LineChart/LineChart"));

export const ClientDetails = ({ clientId }: ClientDetailsProps) => {
  const { data, isLoading, isError } = useClient(clientId);
  console.log("🚀 ~ ClientDetails ~ data:", data);

  const chartData = useMemo(
    () =>
      data
        ? {
            labels: data.consumptions.map(
              (consumption) => `${consumption.year}-${consumption.month}`,
            ),
            datasets: [
              {
                label: "kWh consommés",
                data: data.consumptions.map(
                  (consumption) => consumption.kwh_consumed,
                ),
              },
            ],
          }
        : null,
    [data],
  );

  return (
    <>
      <h1>Consommation client</h1>
      {data && chartData && (
        <Suspense fallback={<ClientDetailsSkeleton />}>
          <div className="flex flex-col border border-slate-200 rounded-md p-2.5 gap-2.5">
            <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex flex-row items-center gap-1.5 text-slate-500">
                <Hash className="size-4 text-slate-400" />
                <code>{data.id}</code>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <User className="size-4 text-slate-400" />
                <h2 className="font-medium">{data.full_name}</h2>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <span className="text-slate-500">Chauffage</span>
                {data.has_elec_heating ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-sm font-medium text-blue-700">
                    <Zap className="size-3.5 text-blue-600" />
                    Électrique
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-sm font-medium text-amber-600">
                    <Flame className="size-3.5 text-amber-600" />
                    Non électrique
                  </span>
                )}
              </div>
            </div>
            <div>
              <LineChart data={chartData} />
            </div>
          </div>
        </Suspense>
      )}
      {isLoading && <ClientDetailsSkeleton />}
      {isError && (
        <StatusText tone="error">
          Erreur lors de la récupération des informations client.
        </StatusText>
      )}
    </>
  );
};
