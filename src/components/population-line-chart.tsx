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

import { STROKE_COLORS } from "@/styles/stroke-colors";
import { TransformedChartData } from "@/types";
import CustomTooltip from "./ui/custom-tooltip";

const customColors = STROKE_COLORS;

type LineChartProps = {
  chartData: TransformedChartData[];
  selectedPrefCodes: number[];
  prefectureNames: Record<number, string>;
};

export default function PopulationLineChart({
  chartData,
  selectedPrefCodes,
  prefectureNames,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={customColors.blueGray} />
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: "12px" }}
          tickMargin={5}
          stroke={customColors.blueGray}
          interval="preserveStartEnd"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          style={{ fontSize: "10px" }}
          stroke={customColors.blueGray}
          tickFormatter={(value: number) => value.toLocaleString()}
          width={52}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
        {selectedPrefCodes.map((prefCode, index) => (
          <Line
            key={prefCode}
            type="monotone"
            dataKey={prefCode.toString()}
            name={prefectureNames[prefCode]}
            stroke={
              Object.values(STROKE_COLORS)[
                index % Object.values(STROKE_COLORS).length
              ]
            }
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
