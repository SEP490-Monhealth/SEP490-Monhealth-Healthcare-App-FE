import { useQuery } from "@tanstack/react-query"

import { WithdrawalRequestStatusEnum } from "@/constants/enum/WithdrawalRequest"

import { WithdrawalRequestType } from "@/schemas/withdrawalRequestSchema"

import {
  fetchWithdrawalRequestById,
  fetchWithdrawalRequests
} from "@/services/withdrawalRequestService"

interface WithdrawalRequestResponse {
  totalPages: number
  totalItems: number
  withdrawalRequests: WithdrawalRequestType[]
}

export const useWithdrawalRequests = (
  page: number,
  limit: number,
  search?: string,
  status?: WithdrawalRequestStatusEnum
) =>
  useQuery<WithdrawalRequestResponse, Error>({
    queryKey: ["withdrawal-requests", page, limit, search, status],
    queryFn: () => fetchWithdrawalRequests(page, limit, search, status),
    staleTime: 1000 * 60 * 5
  })

export const useWithdrawalRequestById = (withdrawalRequestId: string) =>
  useQuery<WithdrawalRequestType, Error>({
    queryKey: ["withdrawal-request", withdrawalRequestId],
    queryFn: () => fetchWithdrawalRequestById(withdrawalRequestId),
    enabled: !!withdrawalRequestId,
    staleTime: 1000 * 60 * 5
  })
