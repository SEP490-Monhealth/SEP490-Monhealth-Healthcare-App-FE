import React from "react"

import DashboardOverview from "@/components/locals/admin/dashboard/dashboard-overview"
import DashboardStatsCard from "@/components/locals/admin/dashboard/dashboard-stats-card"
import RecentSubscriptions from "@/components/locals/admin/dashboard/recent-subscriptions"
import RecentUsers from "@/components/locals/admin/dashboard/recent-users"

function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardStatsCard />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-3">
          <DashboardOverview />
        </div>

        <div className="col-span-2">
          <RecentUsers />
        </div>
      </div>

      <RecentSubscriptions />
    </div>
  )
}

export default DashboardPage
