"use client"

import React from "react"

import LoadingPage from "@/app/admin/loading"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

import StatsCard from "@/components/globals/molecules/stats-card"

import { useAnalysisOverview } from "@/hooks/useAnalysis"

import { formatGrowthRate, formatNumberCustom } from "@/utils/helpers"

// const data = {
//   totalUsers: {
//     count: 35,
//     growthRate: 5
//   },
//   totalSubscriptions: {
//     count: 1098,
//     growthRate: -10
//   },
//   totalRevenue: {
//     count: 4865203,
//     growthRate: 20
//   },
//   totalConsultants: {
//     count: 160,
//     growthRate: 0.5
//   }
// }

function DashboardStatsCard() {
  const { data: overviewData, isLoading, error } = useAnalysisOverview()

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>
  if (!overviewData) {
    return <p>No data available</p>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng người dùng"
        icon={<Users />}
        value={formatNumberCustom(overviewData.totalUsers.count)}
        description={formatGrowthRate(overviewData.totalUsers.growthRate)}
      />

      <StatsCard
        title="Gói đăng ký hoạt động"
        icon={<CreditCard />}
        value={formatNumberCustom(overviewData.totalSubscriptions.count)}
        description={formatGrowthRate(
          overviewData.totalSubscriptions.growthRate
        )}
      />

      <StatsCard
        title="Doanh thu"
        icon={<DollarSign />}
        value={formatNumberCustom(overviewData.totalRevenue.count)}
        description={formatGrowthRate(overviewData.totalRevenue.growthRate)}
      />

      <StatsCard
        title="Tổng chuyên viên hoạt động"
        icon={<Activity />}
        value={formatNumberCustom(overviewData.totalConsultants.count)}
        description={formatGrowthRate(overviewData.totalConsultants.growthRate)}
      />
    </div>
  )
}

export default DashboardStatsCard
