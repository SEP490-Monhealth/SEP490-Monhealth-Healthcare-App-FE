import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { UserSubscriptionStatus } from "@/constants/enum/UserSubscription"

import {
  CreateUpdateSubscriptionType,
  SubscriptionType,
  UserSubscriptionType
} from "@/schemas/subscriptionSchema"

import {
  addSubscription,
  fetchSubscriptionById,
  fetchSubscriptions,
  fetchUserSubscriptionById,
  fetchUserSubscriptions,
  updateSubscription,
  updateSubscriptionStatus
} from "@/services/subscriptionService"

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

export const useSubscriptions = (
  page: number,
  limit: number,
  search?: string,
  sort?: boolean,
  status?: boolean
) =>
  useQuery<SubscriptionsResponse, Error>({
    queryKey: ["subscriptions", page, limit, search, sort, status],
    queryFn: () => fetchSubscriptions(page, limit, search, sort, status),
    staleTime: 1000 * 60 * 5
  })

export const useSubscriptionById = (subscriptionId: string) =>
  useQuery<SubscriptionType, Error>({
    queryKey: ["subscription", subscriptionId],
    queryFn: () => fetchSubscriptionById(subscriptionId),
    enabled: !!subscriptionId,
    staleTime: 1000 * 60 * 5
  })

export const useAddSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateUpdateSubscriptionType>({
    mutationFn: addSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    }
  })
}

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { subscriptionId: string; updatedData: CreateUpdateSubscriptionType }
  >({
    mutationFn: ({ subscriptionId, updatedData }) =>
      updateSubscription(subscriptionId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
      queryClient.invalidateQueries({ queryKey: ["subscription"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update subscription")
    }
  })
}

export const useSubscriptionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { subscriptionId: string }>({
    mutationFn: ({ subscriptionId }) =>
      updateSubscriptionStatus(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update subscription status")
    }
  })
}

export const useUserSubscriptions = (
  page: number,
  limit: number,
  subscription?: string,
  search?: string,
  status?: UserSubscriptionStatus
) =>
  useQuery<UserSubscriptionsResponse, Error>({
    queryKey: ["user-subscriptions", page, limit, subscription, search, status],
    queryFn: () =>
      fetchUserSubscriptions(page, limit, subscription, search, status),
    staleTime: 1000 * 60 * 5
  })

export const useUserSubscriptionById = (userSubscriptionId: string) =>
  useQuery<UserSubscriptionType, Error>({
    queryKey: ["user-subscription", userSubscriptionId],
    queryFn: () => fetchUserSubscriptionById(userSubscriptionId),
    enabled: !!userSubscriptionId,
    staleTime: 1000 * 60 * 5
  })
