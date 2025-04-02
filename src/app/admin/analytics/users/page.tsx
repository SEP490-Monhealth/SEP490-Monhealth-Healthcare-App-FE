"use client"

import React from "react"

import UserGrowthChart from "@/components/locals/admin/analytics/users/user-growth-chart"
import UserStatsCard from "@/components/locals/admin/analytics/users/user-stats-card"

function AnalyticUserPage() {
  return (
    <div className="space-y-8">
      <UserStatsCard />

      <UserGrowthChart />
    </div>
  )
}

export default AnalyticUserPage
