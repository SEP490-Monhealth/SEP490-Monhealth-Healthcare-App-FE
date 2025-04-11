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
  {
    subscription: "Gói cơ bản",
    visitors: 500
  },
  {
    subscription: "Gói nâng cao",
    visitors: 300
  },
  {
    subscription: "Gói cao cấp",
    visitors: 187
  }
]

function SubscriptionDistributionChart() {
  const total = data.reduce((sum, item) => sum + item.visitors, 0)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Thống kê gói đăng ký</CardTitle>
        <CardDescription>Số lượng người dùng theo gói</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = ((item.visitors / total) * 100).toFixed(2)

            return (
              <div key={item.subscription} className="space-y-1">
                <div className="flex justify-between">
                  <span>{item.subscription}</span>
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
