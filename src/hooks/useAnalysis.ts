import { useQuery } from "@tanstack/react-query"

import {
  SubscriptionUpgradedType,
  UserGrowthType,
  UserStatType
} from "@/schemas/analysisSchema"

import {
  fetchSubscriptionUpgraded,
  fetchUserGrowth,
  fetchUserStats
} from "@/services/analysisService"

export const useUserStats = () => {
  return useQuery<UserStatType, Error>({
    queryKey: ["user-tats"],
    queryFn: fetchUserStats,
    staleTime: 1000 * 60 * 5
  })
}

export const useUserGrowth = () => {
  return useQuery<UserGrowthType, Error>({
    queryKey: ["user-growth"],
    queryFn: fetchUserGrowth,
    staleTime: 1000 * 60 * 5
  })
}

export const useSubscriptionUpgraded = () => {
  return useQuery<SubscriptionUpgradedType, Error>({
    queryKey: ["subscription-upgraded"],
    queryFn: fetchSubscriptionUpgraded,
    staleTime: 1000 * 60 * 5
  })
}
