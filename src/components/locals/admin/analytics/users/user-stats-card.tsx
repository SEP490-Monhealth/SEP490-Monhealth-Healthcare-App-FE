"use client"

import React from "react"

import { ChartColumn, UserCheck, UserPlus, Users } from "lucide-react"

import StatsCard from "@/components/globals/molecules/stats-card"

import { formatGrowthRate, formatNumberCustom } from "@/utils/helpers"

function UserStatsCard() {
  const data = {
    totalUsers: {
      count: 7000,
      growthRate: -10
    },
    newUsers: {
      count: 1098,
      growthRate: +10
    },
    totalVisits: {
      count: 50000,
      growthRate: -20
    },
    conversionRate: {
      count: 12.5,
      growthRate: +0.5
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng người dùng"
        icon={<Users />}
        value={formatNumberCustom(data.totalUsers.count)}
        description={formatGrowthRate(data.totalUsers.growthRate)}
      />

      <StatsCard
        title="Người dùng mới"
        icon={<UserPlus />}
        value={formatNumberCustom(data.newUsers.count)}
        description={formatGrowthRate(data.newUsers.growthRate)}
      />

      <StatsCard
        title="Số lượt truy cập"
        icon={<UserCheck />}
        value={formatNumberCustom(data.totalVisits.count)}
        description={formatGrowthRate(data.totalVisits.growthRate)}
      />

      <StatsCard
        title="Tỷ lệ chuyển đổi"
        icon={<ChartColumn />}
        value={data.conversionRate.count}
        description={formatGrowthRate(data.conversionRate.growthRate)}
      />
    </div>
  )
}

export default UserStatsCard
