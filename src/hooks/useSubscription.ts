import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  CreateUpdateSubscriptionType,
  SubscriptionType
} from "@/schemas/subscriptionSchema"

import {
  addSubscription,
  fetchSubscriptionById,
  fetchSubscriptions
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

  return useMutation<SubscriptionType, Error, CreateUpdateSubscriptionType>({
    mutationFn: addSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    }
  })
}
