import type { ChartData } from "chart.js";
import {
  CheckCircle2,
  Flame,
  Hash,
  TriangleAlert,
  User,
  Zap,
} from "lucide-react";
import { lazy, Suspense, useMemo, useState } from "react";
import { useClient } from "../../../api/clients";
import { StatusText } from "../../ui/StatusText/StatusText";
import { ClientDetailsSkeleton } from "./ClientDetailsSkeleton/ClientDetailsSkeleton";
import { Badge } from "../../ui/Badge/Badge";
import { Select } from "../../ui/Select/Select";
import { formatDate } from "../../../utils/date";
import { Typography } from "../../ui/Typography/Typography";

type ClientDetailsProps = {
  clientId: number;
};

const LineChart = lazy(() => import("../../ui/LineChart/LineChart"));

export const ClientDetails = ({ clientId }: ClientDetailsProps) => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>();

  const { data, isLoading, isError } = useClient(clientId, selectedYear);

  const chartData = useMemo(() => {
    if (!data) return null;

    const { consumptions, anomaly_date } = data;

    const anomalyIndex = anomaly_date
      ? consumptions.findIndex(
          (consumption) =>
            consumption.year === anomaly_date.year &&
            consumption.month === anomaly_date.month,
        )
      : -1;

    return {
      labels: consumptions.map((consumption) =>
        formatDate({
          year: consumption.year,
          month: consumption.month,
          monthOption: "short",
        }),
      ),
      datasets: [
        {
          label: "kWh consommés",
          data: consumptions.map((consumption) => consumption.kwh_consumed),
        },
        ...(anomalyIndex !== -1 && anomaly_date
          ? [
              {
                label: `Début d'anomalie (${formatDate({
                  year: anomaly_date.year,
                  month: anomaly_date.month,
                  monthOption: "long",
                })})`,
                data: consumptions.map((consumption, index) =>
                  index === anomalyIndex ? consumption.kwh_consumed : null,
                ),
                showLine: false,
                pointStyle: "circRot" as const,
                pointRadius: 7,
                pointHoverRadius: 9,
                pointBackgroundColor: "oklch(88.5% 0.062 18.334)",
                pointBorderColor: "oklch(57.7% 0.245 27.325)",
              },
            ]
          : []),
      ],
    } satisfies ChartData<"line", (number | null)[], string>;
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2" className="mt-4">
        Consommation client
      </Typography>
      {data && chartData && (
        <Suspense fallback={<ClientDetailsSkeleton />}>
          <div className="flex flex-col border border-slate-200 rounded-md p-2.5 gap-2.5">
            <div className="flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="flex flex-row gap-2">
                <div className="flex flex-row items-center gap-1.5 text-slate-500">
                  <Typography
                    variant="code"
                    className="flex flex-row items-center gap-1"
                  >
                    <Hash className="size-4 text-slate-500" />
                    {data.id}
                  </Typography>
                </div>
                <div className="flex flex-row items-center gap-1.5">
                  <User className="size-4 text-slate-400" />
                  <Typography variant="body-md">{data.full_name}</Typography>
                </div>
              </div>

              <div>
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  options={data.available_years.map((year) => ({
                    label: year,
                    value: year,
                  }))}
                />
              </div>
            </div>
            <div>
              <LineChart data={chartData} />
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-1.5">
                <Typography variant="body" className="!text-slate-500">
                  Chauffage
                </Typography>
                {data.has_elec_heating ? (
                  <Badge variant="info" icon={Zap}>
                    Électrique
                  </Badge>
                ) : (
                  <Badge variant="warning" icon={Flame}>
                    Non électrique
                  </Badge>
                )}
              </div>
              <div>
                {data.has_anomaly && data.anomaly_date ? (
                  <Badge variant="error" icon={TriangleAlert}>
                    Anomalie depuis{" "}
                    {formatDate({
                      year: data.anomaly_date.year,
                      month: data.anomaly_date.month,
                      monthOption: "long",
                    })}
                  </Badge>
                ) : (
                  <Badge variant="success" icon={CheckCircle2}>
                    Aucune anomalie
                  </Badge>
                )}
              </div>
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
    </div>
  );
};
