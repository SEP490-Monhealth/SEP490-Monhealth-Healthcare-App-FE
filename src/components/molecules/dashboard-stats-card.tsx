"use client"

import React from "react"

import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

import StatsCard from "./stats-card"

function DashboardStatsCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng số người dùng"
        icon={<Users />}
        value="2,853"
        description="+18% so với tháng trước"
      />

      <StatsCard
        title="Gói đăng ký đang hoạt động"
        icon={<CreditCard />}
        value="1,429"
        description="+12% so với tháng trước"
      />

      <StatsCard
        title="Doanh thu"
        icon={<DollarSign />}
        value="$48,395"
        description="+7% so với tháng trước"
      />

      <StatsCard
        title="Tư vấn viên đang hoạt động"
        icon={<Activity />}
        value="42"
        description="+4 so với tháng trước"
      />
    </div>
  )
}

export default DashboardStatsCard
