import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CategoryBooksData } from "@/store/service/dashboard/type";
import React from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

interface ChartOverviewProps {
  data: CategoryBooksData[];
}

const chartConfig = {
  books: {
    label: "Books",
    color: "hsl(var(--chart-1))",
  },
  fantasy: {
    label: "Fantasy",
    color: "hsl(var(--chart-1))",
  },
  romance: {
    label: "Romance",
    color: "hsl(var(--chart-2))",
  },
  "mental health": {
    label: "Mental Health",
    color: "hsl(var(--chart-3))",
  },
  others: {
    label: "Others",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const ChartOverview: React.FC<ChartOverviewProps> = ({ data }) => {
  // Transform the data to include fill color
  const transformedData = data?.map((item) => ({
    category: item?.category ?? 0,
    books: item?.books ?? 0,
    fill: chartConfig[item?.category]?.color ?? "hsl(var(--chart-5))",
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Category</CardTitle>
        <CardDescription>Total books by categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            width={600}
            height={300}
            data={transformedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label || value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="books"
              fill="hsl(var(--chart-1))"
              strokeWidth={2}
              radius={8}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartOverview;
