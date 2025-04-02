"use client"

import React from "react"

import SubscriptionChart from "@/components/locals/admin/analytics/subscriptions/subscription-chart"
import SubscriptionDistributionChart from "@/components/locals/admin/analytics/subscriptions/subscription-distribution-chart"

function AnalyticSubscriptionPage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
      <div className="col-span-3">
        <SubscriptionChart />
      </div>

      <div className="col-span-2">
        <SubscriptionDistributionChart />
      </div>
    </div>
  )
}

export default AnalyticSubscriptionPage
