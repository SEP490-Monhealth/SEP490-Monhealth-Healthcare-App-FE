"use client"

import React from "react"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

import {
  calculateGrowthRate,
  getRangeOfLastSixMonths,
  transformUserData
} from "@/utils/helpers"

const data = [
  {
    month: "2024-11",
    count: 340
  },
  {
    month: "2024-12",
    count: 500
  },
  {
    month: "2025-1",
    count: 200
  },
  {
    month: "2025-2",
    count: 600
  },
  {
    month: "2025-3",
    count: 209
  },
  {
    month: "2025-4",
    count: 214
  }
]

const countUsers = transformUserData(data)

const chartConfig = {
  count: {
    label: "Người dùng",
    color: "var(--primary)"
  }
} satisfies ChartConfig

function UserGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ tăng trưởng</CardTitle>
        <CardDescription>
          Hiển thị tổng số lượt truy cập trong 6 tháng gần đây
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={countUsers}
            margin={{
              left: 28,
              right: 16
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="count"
              type="natural"
              fill="var(--primary)"
              fillOpacity={1}
              stroke="var(--white)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {calculateGrowthRate(countUsers)}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {getRangeOfLastSixMonths()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default UserGrowthChart
