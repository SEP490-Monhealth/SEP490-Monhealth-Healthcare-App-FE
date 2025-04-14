import { useQuery } from "@tanstack/react-query"

import {
  AnalysisOverviewType,
  SubscriptionUpgradedType,
  UserGrowthType,
  UserStatType
} from "@/schemas/analysisSchema"

import {
  fetchAnalysisOverview,
  fetchSubscriptionUpgraded,
  fetchTotalAccounts,
  fetchUserGrowth,
  fetchUserStats
} from "@/services/analysisService"

export const useUserStats = () => {
  return useQuery<UserStatType, Error>({
    queryKey: ["user-stats"],
    queryFn: fetchUserStats,
    staleTime: 1000 * 60 * 5
  })
}

export const useUserGrowth = () => {
  return useQuery<UserGrowthType[], Error>({
    queryKey: ["user-growth"],
    queryFn: fetchUserGrowth,
    staleTime: 1000 * 60 * 5
  })
}

export const useSubscriptionUpgraded = () => {
  return useQuery<SubscriptionUpgradedType[], Error>({
    queryKey: ["subscription-upgraded"],
    queryFn: fetchSubscriptionUpgraded,
    staleTime: 1000 * 60 * 5
  })
}

export const useTotalAccounts = () => {
  return useQuery<UserGrowthType[], Error>({
    queryKey: ["subscription-upgraded"],
    queryFn: fetchTotalAccounts,
    staleTime: 1000 * 60 * 5
  })
}

export const useAnalysisOverview = () => {
  return useQuery<AnalysisOverviewType, Error>({
    queryKey: ["analysis-overview"],
    queryFn: fetchAnalysisOverview,
    staleTime: 1000 * 60 * 5
  })
}
