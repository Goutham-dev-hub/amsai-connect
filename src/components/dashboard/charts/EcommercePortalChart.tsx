import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--success))",
  },
};

export function EcommercePortalChart({ data }) {
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
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <defs>
            <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
            </linearGradient>
        </defs>
        <Area
          dataKey="sales"
          type="monotone"
          fill="url(#fillSales)"
          stroke="var(--color-sales)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}