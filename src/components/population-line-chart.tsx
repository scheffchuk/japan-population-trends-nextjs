import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TransformedChartDataPoint } from "./population-data-card";

type LineChartProps = {
  chartData: TransformedChartDataPoint[];
  selectedPrefCodes: number[];
};

const COLORS = [
  "#3b82f6", // blue-500
  "#ef4444", // red-500
  "#22c55e", // green-500
  "#eab308", // yellow-500
  "#a855f7", // purple-500
  "#f97316", // orange-500
  "#6ee7b7", // emerald-300 (like a lighter green)
  "#7dd3fc", // sky-300 (like a lighter blue)
  "#fcd34d", // amber-300 (like a lighter orange/yellow)
  "#fda4af", // rose-300 (like a lighter red/pink)
  "#bef264", // lime-300
  "#5eead4", // teal-300
];

export default function PopulationLineChart({
  chartData,
  selectedPrefCodes,
}: LineChartProps) {
  if (chartData.length === 0 || selectedPrefCodes.length === 0) {
    return <div>No data to display</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: "12px" }}
          tickMargin={5}
          stroke="#9ca3af"
          interval="preserveStartEnd"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          style={{ fontSize: "10px" }}
          stroke="#9ca3af"
          tickFormatter={(value: number) => value.toLocaleString()}
          width={52}
        />
        {/*TODO: <Tooltip/> */}
        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
        {selectedPrefCodes.map((prefCode, index) => (
          <Line
            key={prefCode}
            type="monotone"
            dataKey={prefCode.toString()} // Ensure dataKey is string
            stroke={COLORS[index % COLORS.length]} // Use passed colors
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            className="drop-shadow-md"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
