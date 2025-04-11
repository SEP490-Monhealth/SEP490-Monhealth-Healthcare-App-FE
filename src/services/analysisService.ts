import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import {
  SubscriptionUpgradedType,
  UserGrowthType,
  UserStatType
} from "@/schemas/analysisSchema"

export const fetchUserStats = async (): Promise<UserStatType> => {
  try {
    const response = await monAPI.get(`/analysis/users`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch users")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch users"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchUserGrowth = async (): Promise<UserGrowthType> => {
  try {
    const response = await monAPI.get(`/six-month-users/users`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch users")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch users"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchSubscriptionUpgraded =
  async (): Promise<SubscriptionUpgradedType> => {
    try {
      const response = await monAPI.get(`/six-month-subscriptions/users`)

      const { success, message, data } = response.data

      if (!success) {
        throw new Error(message || "Failed to fetch subscriptions")
      }

      return data
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch subscriptions"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }
  }
