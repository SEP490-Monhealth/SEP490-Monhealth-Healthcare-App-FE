"use client"

import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/globals/atoms/card"
import { Progress } from "@/components/globals/atoms/progress"

const data = [
  { name: "Gói Cơ Bản", value: 5234 },
  { name: "Gói Nâng Cao", value: 3456 },
  { name: "Gói Cao Cấp", value: 2345 }
]

function SubscriptionDistributionChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Thống kê gói đăng ký</CardTitle>
        <CardDescription>Số lượng người dùng theo gói</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = ((item.value / total) * 100).toFixed(2)

            return (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{percentage}%</span>
                </div>
                <Progress value={parseFloat(percentage)} />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default SubscriptionDistributionChart
