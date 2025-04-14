"use client"

import React from "react"

import LoadingPage from "@/app/admin/loading"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/globals/atoms/card"
import { Progress } from "@/components/globals/atoms/progress"

import { useSubscriptionUpgraded } from "@/hooks/useAnalysis"

// const data = [
//   {
//     subscription: "Gói cơ bản",
//     visitors: 500
//   },
//   {
//     subscription: "Gói nâng cao",
//     visitors: 300
//   },
//   {
//     subscription: "Gói cao cấp",
//     visitors: 187
//   }
// ]

function SubscriptionDistributionChart() {
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
  const total = SubscriptionUpgradedData.reduce(
    (sum, item) => sum + item.visitors,
    0
  )

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Thống kê gói đăng ký</CardTitle>
        <CardDescription>Số lượng người dùng theo gói</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {SubscriptionUpgradedData.map((item) => {
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
