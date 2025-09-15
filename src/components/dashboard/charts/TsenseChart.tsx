import { Line, LineChart, CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  users: {
    label: "Active Users",
    color: "hsl(var(--primary))",
  },
};

export function TsenseChart({ data }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <defs>
            <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.1} />
            </linearGradient>
        </defs>
        <Area
          dataKey="users"
          type="monotone"
          fill="url(#fillUsers)"
          stroke="var(--color-users)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}