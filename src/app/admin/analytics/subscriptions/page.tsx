"use client"

import React from "react"

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
import { Progress } from "@/components/globals/atoms/progress"

import { useSubscriptionUpgraded } from "@/hooks/useAnalytic"

import {
  getRangeOfLastSixMonths,
  transformSubscriptionData
} from "@/utils/helpers"

import LoadingPage from "../../loading"

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

function AnalyticSubscriptionPage() {
  const { data: subscriptionUpgradedData, isLoading } =
    useSubscriptionUpgraded()

  console.log(JSON.stringify(subscriptionUpgradedData, null, 2))

  if (!subscriptionUpgradedData || isLoading) return <LoadingPage />

  const chartData = transformSubscriptionData(subscriptionUpgradedData)

  const totalVisitors = subscriptionUpgradedData.reduce(
    (sum, item) => sum + (item.visitors || 0),
    0
  )

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
      <div className="col-span-3">
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
      </div>

      <div className="col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Thống kê gói đăng ký</CardTitle>
            <CardDescription>Số lượng người dùng theo gói</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionUpgradedData.map((item, index) => {
                const percentage = (item.visitors / totalVisitors) * 100

                return (
                  <div
                    key={`${item.subscription}-${index}`}
                    className="space-y-1"
                  >
                    <div className="flex justify-between">
                      <span>{item.subscription}</span>
                      <span>{percentage || 0}%</span>
                    </div>

                    <Progress value={percentage} />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AnalyticSubscriptionPage
