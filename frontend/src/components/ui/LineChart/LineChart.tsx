import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
} from "chart.js";
import { useEffect, useRef } from "react";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
);

type LineChartProps = {
  data: ChartData<"line", (number | null)[], string>;
};

const LineChart = ({ data }: LineChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: data,
    });
    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default LineChart;
