"use client"

import React from "react"

import SubscriptionChart from "@/components/locals/admin/analytics/subscriptions/subscription-chart"
import SubscriptionDistributionChart from "@/components/locals/admin/analytics/subscriptions/subscription-distribution-chart"

import { useSubscriptionUpgraded } from "@/hooks/useAnalysis"

import { transformSubscriptionData } from "@/utils/helpers"

import LoadingPage from "../../loading"

function AnalyticSubscriptionPage() {
  const { data: subscriptionUpgradedData, isLoading } =
    useSubscriptionUpgraded()

  if (!subscriptionUpgradedData || isLoading) return <LoadingPage />

  const chartData = transformSubscriptionData(subscriptionUpgradedData)

  const totalVisitors = subscriptionUpgradedData.reduce(
    (sum, item) => sum + item.visitors,
    0
  )

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
      <div className="col-span-3">
        <SubscriptionChart chartData={chartData} />
      </div>

      <div className="col-span-2">
        <SubscriptionDistributionChart
          subscriptionUpgradedData={subscriptionUpgradedData}
          totalVisitors={totalVisitors}
        />
      </div>
    </div>
  )
}

export default AnalyticSubscriptionPage
