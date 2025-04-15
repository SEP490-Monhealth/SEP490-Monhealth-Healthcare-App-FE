"use client"

import React from "react"

import UserGrowthChart from "@/components/locals/admin/analytics/users/user-growth-chart"
import UserStatsCard from "@/components/locals/admin/analytics/users/user-stats-card"

import { useUserGrowth, useUserStats } from "@/hooks/useAnalysis"

import { transformUserData } from "@/utils/helpers"

import LoadingPage from "../../loading"

function AnalyticUserPage() {
  const { data: userStatsData, isLoading: isUserStatsLoading } = useUserStats()
  const { data: growthUserData, isLoading: isGrowthUserLoading } =
    useUserGrowth()

  if (
    !userStatsData ||
    isUserStatsLoading ||
    !growthUserData ||
    isGrowthUserLoading
  )
    return <LoadingPage />

  const countUsers = transformUserData(growthUserData)

  return (
    <div className="space-y-8">
      <UserStatsCard userStatsData={userStatsData} />

      <UserGrowthChart countUsers={countUsers} />
    </div>
  )
}

export default AnalyticUserPage
