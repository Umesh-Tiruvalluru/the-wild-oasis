import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useTheme } from "../theme-provider";

interface Booking {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}

interface SalesChartProps {
  bookings: Booking[]; // Always an array
  numDays: number;
}

interface ChartDataPoint {
  label: string;
  totalSales: number;
  extrasSales: number;
  date: Date;
}

const colorConfig = {
  light: {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  },
  dark: {
    totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
    extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
    text: "#e5e7eb",
    background: "#18212f",
  },
};

export default function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const colors = isDark ? colorConfig.dark : colorConfig.light;

  // Generate array of all dates for the chart
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  // Process bookings data
  const data: ChartDataPoint[] = allDates.map((date) => {
    const dayBookings = bookings.filter((booking) =>
      isSameDay(date, new Date(booking.created_at)),
    );

    return {
      label: format(date, "MMM dd"),
      date,
      totalSales: dayBookings.reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: dayBookings.reduce((acc, curr) => acc + curr.extrasPrice, 0),
    };
  });

  return (
    <Card className="col-span-full p-6">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-300 dark:stroke-gray-700"
            />
            <XAxis
              dataKey="label"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <YAxis
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
              width={80}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.background,
                borderColor: isDark ? "#374151" : "#e5e7eb",
              }}
              itemStyle={{ color: colors.text }}
              formatter={(value: number) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value)
              }
              labelFormatter={(label: string) => `Date: ${label}`}
            />
            <Area
              dataKey="totalSales"
              stroke={colors.totalSales.stroke}
              fill={colors.totalSales.fill}
              strokeWidth={2}
              name="Total sales"
            />
            <Area
              dataKey="extrasSales"
              stroke={colors.extrasSales.stroke}
              fill={colors.extrasSales.fill}
              strokeWidth={2}
              name="Extras sales"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
