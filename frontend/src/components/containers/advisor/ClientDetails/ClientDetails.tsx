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
import { useClient } from "@/api/clients";
import { StatusText } from "@/components/ui/StatusText/StatusText";
import { ClientDetailsSkeleton } from "../ClientDetailsSkeleton/ClientDetailsSkeleton";
import { Badge } from "@/components/ui/Badge/Badge";
import { Select } from "@/components/ui/Select/Select";
import { formatDate } from "@/utils/date";
import { Typography } from "@/components/ui/Typography/Typography";
import { colorToken } from "@/utils/color-token";

type ClientDetailsProps = {
  clientId: number;
};

const LineChart = lazy(() => import("@/components/ui/LineChart/LineChart"));

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
          pointBackgroundColor: colorToken("--color-brand-surface"),
          pointBorderColor: colorToken("--color-brand"),
          pointRadius: (ctx) => (ctx.dataIndex === anomalyIndex ? 0 : 3),
          pointHoverRadius: (ctx) => (ctx.dataIndex === anomalyIndex ? 0 : 5),
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
                pointBackgroundColor: colorToken("--color-error-border"),
                pointBorderColor: colorToken("--color-destructive"),
              },
            ]
          : []),
      ],
    } satisfies ChartData<"line", (number | null)[], string>;
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">Consommation client</Typography>
      {data && chartData && (
        <Suspense fallback={<ClientDetailsSkeleton />}>
          <div className="flex flex-col border border-border rounded-md p-2.5 gap-2.5">
            <div className="flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="flex min-w-0 flex-row gap-2">
                <div className="flex shrink-0 flex-row items-center gap-1.5 text-muted-foreground">
                  <Typography
                    variant="code"
                    className="flex flex-row items-center gap-1"
                  >
                    <Hash className="size-4 shrink-0 text-muted-foreground" />
                    {data.id}
                  </Typography>
                </div>
                <div className="flex min-w-0 flex-row items-center gap-1.5">
                  <User className="size-4 shrink-0 text-faint" />
                  <Typography variant="body-md" className="truncate">
                    {data.full_name}
                  </Typography>
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
            <div className="flex flex-row flex-wrap items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-1.5">
                <Typography variant="body" className="text-muted-foreground">
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
                  <Badge variant="error" icon={TriangleAlert} showLabel>
                    Anomalie :{" "}
                    {formatDate({
                      year: data.anomaly_date.year,
                      month: data.anomaly_date.month,
                      monthOption: "short",
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
