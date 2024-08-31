import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getMonthlyOrder, getYearlyOrder } from "@/lib/getData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer } from "recharts";
import { Skeleton } from "../ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#121212",
  },
  mobile: {
    label: "Mobile",
    color: "#0ea5e9",
  },
} satisfies ChartConfig;

const OrderStatusChart = ({ accessToken }: { accessToken: string }) => {
  const { data: monthlyOrder } = useQuery({
    queryKey: ["monthlyOrder"],
    queryFn: () => getMonthlyOrder(accessToken),
  });

  const { data: yearlyOrder } = useQuery({
    queryKey: ["yearlyOrder"],
    queryFn: () => getYearlyOrder(accessToken),
  });

  return (
    <Tabs defaultValue="month">
      {monthlyOrder && yearlyOrder ? (
        <>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>

          <TabsContent value="month">
            <ResponsiveContainer width="100%" height={350}>
              <ChartContainer config={chartConfig} className="min-h-[200px]">
                <BarChart data={monthlyOrder}>
                  <CartesianGrid vertical={false} />

                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="capitalize"
                        indicator="line"
                      />
                    }
                  />

                  <Bar dataKey="orders" fill="black" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="year">
            <ResponsiveContainer width="100%" height={350}>
              <ChartContainer config={chartConfig} className="min-h-[200px]">
                <BarChart data={yearlyOrder}>
                  <CartesianGrid vertical={false} />

                  <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                  />

                  <Bar dataKey="amount" fill="black" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </TabsContent>
        </>
      ) : (
        <Skeleton className="h-96" />
      )}
    </Tabs>
  );
};

export default OrderStatusChart;
