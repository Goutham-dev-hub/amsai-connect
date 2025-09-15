import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  errors: {
    label: "Errors",
    color: "hsl(var(--destructive))",
  },
  warnings: {
    label: "Warnings",
    color: "hsl(var(--warning))",
  },
};

export function LogMonitorChart({ data }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <defs>
            <linearGradient id="fillErrors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-errors)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-errors)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillWarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-warnings)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-warnings)" stopOpacity={0.1} />
            </linearGradient>
        </defs>
        <Bar dataKey="errors" fill="url(#fillErrors)" radius={4} />
        <Bar dataKey="warnings" fill="url(#fillWarnings)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}