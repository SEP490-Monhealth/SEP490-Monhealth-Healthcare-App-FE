"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/globals/atoms/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/globals/atoms/chart"

const chartData = [
  { subscription: "basic", visitors: 275, fill: "var(--primary)" },
  { subscription: "advanced", visitors: 200, fill: "var(--primary)" },
  { subscription: "premium", visitors: 187, fill: "var(--primary)" }
]

const chartConfig = {
  basic: {
    label: "Chrome",
    color: "hsl(var(--chart-1))"
  },
  advanced: {
    label: "Safari",
    color: "hsl(var(--chart-2))"
  },
  premium: {
    label: "Firefox",
    color: "hsl(var(--chart-3))"
  }
} satisfies ChartConfig

function SubscriptionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pie Chart - Custom Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px] px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--primary))"
                  >
                    {payload.visitors}
                  </text>
                )
              }}
              nameKey="subscription"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Tăng trưởng 5.2% trong tháng này{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Hiển thị tổng số lượt truy cập trong 6 tháng gần đây
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default SubscriptionChart
