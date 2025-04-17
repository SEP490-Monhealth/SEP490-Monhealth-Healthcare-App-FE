"use client"

import LoadingPage from "@/app/admin/loading"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/globals/atoms/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/globals/atoms/chart"

import { useTotalAccounts } from "@/hooks/useAnalysis"

import { transformUserData } from "@/utils/helpers"

// const chartData = [
//   { month: "2025-01", count: 186 },
//   { month: "2025-02", count: 305 },
//   { month: "2025-03", count: 237 },
//   { month: "2025-04", count: 73 }
// ]

const chartConfig = {
  count: {
    label: "Tài khoản",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig

function DashboardOverview() {
  const { data: totalAccountsData, isLoading, error } = useTotalAccounts()

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>
  if (!totalAccountsData) {
    return <p>No data available</p>
  }

  const countUsers = transformUserData(totalAccountsData)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Tổng quát</CardTitle>
        <CardDescription>
          Số lượng tài khoản đăng ký trong năm nay
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={countUsers} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--primary)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardOverview
