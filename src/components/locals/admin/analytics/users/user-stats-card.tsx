"use client"

import React from "react"

import LoadingPage from "@/app/admin/loading"
import { ChartColumn, UserCheck, UserPlus, Users } from "lucide-react"

import StatsCard from "@/components/globals/molecules/stats-card"

import { useUserStats } from "@/hooks/useAnalysis"

import { formatGrowthRate, formatNumberCustom } from "@/utils/helpers"

// const data = {
//   totalUsers: {
//     count: 1,
//     growthRate: -10
//   },
//   newUsers: {
//     count: 1098,
//     growthRate: +10
//   },
//   totalVisits: {
//     count: 50000,
//     growthRate: -20
//   },
//   conversionRate: {
//     count: 12.5,
//     growthRate: +0.5
//   }
// }

function UserStatsCard() {
  const { data: userStatsData, isLoading, error } = useUserStats()

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>
  if (!userStatsData) {
    return <p>No data available</p>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng người dùng"
        icon={<Users />}
        value={formatNumberCustom(userStatsData.totalUsers.count)}
        description={formatGrowthRate(userStatsData.totalUsers.growthRate)}
      />

      <StatsCard
        title="Người dùng mới"
        icon={<UserPlus />}
        value={formatNumberCustom(userStatsData.newUsers.count)}
        description={formatGrowthRate(userStatsData.newUsers.growthRate)}
      />

      <StatsCard
        title="Số lượt truy cập"
        icon={<UserCheck />}
        value={formatNumberCustom(userStatsData.totalVisits.count)}
        description={formatGrowthRate(userStatsData.totalVisits.growthRate)}
      />

      <StatsCard
        title="Tỷ lệ chuyển đổi"
        icon={<ChartColumn />}
        value={userStatsData.conversionRate.count}
        description={formatGrowthRate(userStatsData.conversionRate.growthRate)}
      />
    </div>
  )
}

export default UserStatsCard
