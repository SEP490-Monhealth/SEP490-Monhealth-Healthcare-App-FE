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

const chartData = [
  { month: "Tháng 1", desktop: 186 },
  { month: "Tháng 2", desktop: 305 },
  { month: "Tháng 3", desktop: 237 },
  { month: "Tháng 4", desktop: 73 },
  { month: "Tháng 5", desktop: 209 },
  { month: "Tháng 6", desktop: 214 }
]

const chartConfig = {
  desktop: {
    label: "Máy tính để bàn",
    color: "hsl(var(--chart-1))"
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
            data={chartData}
            margin={{
              left: 24,
              right: 12
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
              dataKey="desktop"
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
              Tăng trưởng 5.2% trong tháng này{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Tháng 1 - Tháng 6 năm 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default UserGrowthChart
