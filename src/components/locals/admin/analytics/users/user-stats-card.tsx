"use client"

import React from "react"

import { ChartColumn, UserCheck, UserPlus, Users } from "lucide-react"

import StatsCard from "@/components/globals/molecules/stats-card"

function UserStatsCard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng người dùng"
        icon={<Users />}
        value="12,345"
        description="+2.5% so với tháng trước"
      />

      <StatsCard
        title="Người dùng mới"
        icon={<UserPlus />}
        value="1,234"
        description="+5.2% so với tháng trước"
      />

      <StatsCard
        title="Tỷ lệ chuyển đổi"
        icon={<UserCheck />}
        value="12.5%"
        description="+0.5% so với tháng trước"
      />

      <StatsCard
        title="Tỷ lệ duy trì"
        icon={<ChartColumn />}
        value="85.3%"
        description="+1.2% so với tháng trước"
      />
    </div>
  )
}

export default UserStatsCard
