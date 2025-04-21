import axios from "axios"
import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import {
  AnalyticOverviewType,
  SubscriptionUpgradedType,
  UserGrowthType,
  UserStatType
} from "@/schemas/analyticSchema"

export const fetchUserStats = async (): Promise<UserStatType> => {
  try {
    const response = await monAPI.get(`/analytics/users/summary`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch users")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch users"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchUserGrowth = async (): Promise<UserGrowthType[]> => {
  try {
    const response = await monAPI.get(`analytics/users/registrations`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch users")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch users"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchSubscriptionUpgraded = async (): Promise<
  SubscriptionUpgradedType[]
> => {
  try {
    const response = await monAPI.get(`analytics/users/subscriptions`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch subscriptions")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch subscriptions"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchTotalAccounts = async (): Promise<UserGrowthType[]> => {
  try {
    const response = await monAPI.get(`analytics/users/total-accounts`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch users")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch users"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchAnalysisOverview =
  async (): Promise<AnalyticOverviewType> => {
    try {
      const response = await monAPI.get(`/analytics/overview`)

      const { success, message, data } = response.data

      if (!success) {
        throw new Error(message || "Failed to fetch overview")
      }

      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch overview"
        toast.error(errorMessage)
        throw new Error(errorMessage)
      }

      toast.error("An unknown error occurred")
      throw new Error("An unknown error occurred")
    }
  }
