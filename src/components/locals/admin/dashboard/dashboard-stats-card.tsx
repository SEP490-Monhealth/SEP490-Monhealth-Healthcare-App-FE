"use client"

import React from "react"

import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

import StatsCard from "@/components/globals/molecules/stats-card"

import { formatGrowthRate, formatNumberCustom } from "@/utils/helpers"

const data = {
  totalUsers: {
    count: 35,
    growthRate: 5
  },
  totalSubscriptions: {
    count: 1098,
    growthRate: -10
  },
  totalRevenue: {
    count: 4865203,
    growthRate: 20
  },
  totalConsultants: {
    count: 160,
    growthRate: 0.5
  }
}

function DashboardStatsCard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng người dùng"
        icon={<Users />}
        value={formatNumberCustom(data.totalUsers.count)}
        description={formatGrowthRate(data.totalUsers.growthRate)}
      />

      <StatsCard
        title="Gói đăng ký hoạt động"
        icon={<CreditCard />}
        value={formatNumberCustom(data.totalSubscriptions.count)}
        description={formatGrowthRate(data.totalSubscriptions.growthRate)}
      />

      <StatsCard
        title="Doanh thu"
        icon={<DollarSign />}
        value={formatNumberCustom(data.totalRevenue.count)}
        description={formatGrowthRate(data.totalRevenue.growthRate)}
      />

      <StatsCard
        title="Tổng chuyên viên hoạt động"
        icon={<Activity />}
        value={formatNumberCustom(data.totalConsultants.count)}
        description={formatGrowthRate(data.totalConsultants.growthRate)}
      />
    </div>
  )
}

export default DashboardStatsCard
