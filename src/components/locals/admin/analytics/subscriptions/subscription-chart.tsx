"use client"

import LoadingPage from "@/app/admin/loading"
import { Cell, Pie, PieChart } from "recharts"

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

import { useSubscriptionUpgraded } from "@/hooks/useAnalysis"

import {
  getRangeOfLastSixMonths,
  transformSubscriptionData
} from "@/utils/helpers"

// const SubscriptionUpgradedData = [
//   {
//     subscription: "Gói Cơ Bản",
//     visitors: 500
//   },
//   {
//     subscription: "Gói Nâng Cao",
//     visitors: 300
//   },
//   {
//     subscription: "Gói Cao Cấp",
//     visitors: 187
//   }
// ]

const chartConfig = {
  basic: {
    label: "Gói Cơ Bản",
    color: "var(--secondary)"
  },
  advanced: {
    label: "Gói Nâng Cao",
    color: "var(--sidebar-ring)"
  },
  premium: {
    label: "Gói Cao Cấp",
    color: "var(--primary)"
  }
} satisfies ChartConfig

function SubscriptionChart() {
  const {
    data: SubscriptionUpgradedData,
    isLoading,
    error
  } = useSubscriptionUpgraded()

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>
  if (!SubscriptionUpgradedData) {
    return <p>No data available</p>
  }

  const chartData = transformSubscriptionData(SubscriptionUpgradedData)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ nâng cấp gói</CardTitle>
        <CardDescription>{getRangeOfLastSixMonths()}</CardDescription>
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
            >
              {chartData.map((entry, index) => {
                const color =
                  entry.subscription === chartConfig.basic.label
                    ? chartConfig.basic.color
                    : entry.subscription === chartConfig.advanced.label
                      ? chartConfig.advanced.color
                      : chartConfig.premium.color

                return <Cell key={`cell-${index}`} fill={color} />
              })}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Hiển thị tổng số gói đã được đăng ký trong 6 tháng gần đây
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default SubscriptionChart
