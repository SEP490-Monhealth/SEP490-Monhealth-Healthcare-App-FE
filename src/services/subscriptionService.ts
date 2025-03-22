import monAPI from "@/lib/monAPI"

import {
  CreateUpdateSubscriptionType,
  SubscriptionType
} from "@/schemas/subscriptionSchema"

interface SubscriptionsResponse {
  totalPages: number
  totalItems: number
  subscriptions: SubscriptionType[]
}

export const fetchSubscriptions = async (
  page: number,
  limit: number,
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
    console.error("Error fetching subscriptions:", error)
    throw new Error("Failed to fetch subscriptions")
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
    console.error("Error fetching subscription by ID:", error)
    throw new Error("Failed to fetch subscription")
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
    console.error("Error adding subscription:", error)
    throw new Error("Failed to add subscription")
  }
}
