import axios from "axios"
import { toast } from "sonner"

import { UserSubscriptionStatus } from "@/constants/enum/UserSubscription"

import monAPI from "@/lib/monAPI"

import {
  CreateUpdateSubscriptionType,
  SubscriptionType,
  UserSubscriptionType
} from "@/schemas/subscriptionSchema"

interface SubscriptionsResponse {
  totalPages: number
  totalItems: number
  subscriptions: SubscriptionType[]
}

interface UserSubscriptionsResponse {
  totalPages: number
  totalItems: number
  userSubscriptions: UserSubscriptionType[]
}

export const fetchSubscriptions = async (
  page: number,
  limit?: number,
  search?: string,
  sort?: boolean,
  status?: boolean
): Promise<SubscriptionsResponse> => {
  try {
    const response = await monAPI.get(`/subscriptions`, {
      params: { page, limit, search, sort, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch subscriptions")
    }

    const { totalPages, totalItems, items: subscriptions } = data
    return { totalPages, totalItems, subscriptions }
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

export const fetchSubscriptionById = async (
  subscriptionId: string
): Promise<SubscriptionType> => {
  try {
    const response = await monAPI.get(`/subscriptions/${subscriptionId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch subscription")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch subscription"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const addSubscription = async (
  newSubscriptionData: CreateUpdateSubscriptionType
): Promise<string> => {
  try {
    const response = await monAPI.post("/subscriptions", newSubscriptionData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add subscription")
    }

    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to add subscription"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const updateSubscription = async (
  subscriptionId: string,
  updatedData: CreateUpdateSubscriptionType
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/subscriptions/${subscriptionId}`,
      updatedData
    )

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update subscription")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update subscription"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const updateSubscriptionStatus = async (
  subscriptionId: string
): Promise<void> => {
  try {
    const response = await monAPI.patch(
      `/subscriptions/${subscriptionId}/status`
    )

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update subscription status")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update subscription status"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchUserSubscriptions = async (
  page: number,
  limit?: number,
  subscription?: string,
  search?: string,
  sort?: string,
  order?: string,
  status?: UserSubscriptionStatus
): Promise<UserSubscriptionsResponse> => {
  try {
    const response = await monAPI.get(`/user-subscriptions`, {
      params: { page, limit, subscription, search, sort, order, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch user subscriptions")
    }

    const { totalPages, totalItems, items: userSubscriptions } = data
    return { totalPages, totalItems, userSubscriptions }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user subscriptions"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchUserSubscriptionById = async (
  userSubscriptionId: string
): Promise<UserSubscriptionType> => {
  try {
    const response = await monAPI.get(
      `/user-subscriptions/${userSubscriptionId}`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch user subscription")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch user subscription"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
