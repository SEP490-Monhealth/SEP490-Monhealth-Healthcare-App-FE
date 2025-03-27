import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  CreateSubscriptionType,
  SubscriptionType,
  UpdateSubscriptionType
} from "@/schemas/subscriptionSchema"

import {
  addSubscription,
  fetchSubscriptionById,
  fetchSubscriptions,
  updateSubscription,
  updateSubscriptionStatus
} from "@/services/subscriptionService"

export const useSubscriptions = (
  page: number,
  limit: number,
  search?: string,
  sort?: boolean,
  status?: boolean
) =>
  useQuery({
    queryKey: ["subscriptions", page, limit, search, sort, status],
    queryFn: () => fetchSubscriptions(page, limit, search, sort, status),
    staleTime: 1000 * 60 * 5
  })

export const useSubscriptionById = (subscriptionId: string) =>
  useQuery<SubscriptionType, Error>({
    queryKey: ["subscription", subscriptionId],
    queryFn: () => fetchSubscriptionById(subscriptionId),
    enabled: !!subscriptionId
  })

export const useAddSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateSubscriptionType>({
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
    { subscriptionId: string; updatedData: UpdateSubscriptionType }
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
