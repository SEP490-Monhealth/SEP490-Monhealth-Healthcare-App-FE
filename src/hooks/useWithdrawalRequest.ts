import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { WithdrawalRequestStatusEnum } from "@/constants/enum/WithdrawalRequest"

import {
  WithdrawalRequestQrCodeType,
  WithdrawalRequestType
} from "@/schemas/withdrawalRequestSchema"

import {
  approveWithdrawalRequest,
  fetchWithdrawalRequestById,
  fetchWithdrawalRequestQrCodeById,
  fetchWithdrawalRequests,
  rejectWithdrawalRequest,
  updateWithdrawalRequestStatus
} from "@/services/withdrawalRequestService"

interface WithdrawalRequestResponse {
  totalPages: number
  totalItems: number
  withdrawalRequests: WithdrawalRequestType[]
}

export const useWithdrawalRequests = (
  page: number,
  limit?: number,
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

export const useWithdrawalRequestQrCodeById = (withdrawalRequestId: string) =>
  useQuery<WithdrawalRequestQrCodeType, Error>({
    queryKey: ["withdrawal-request-qr-code", withdrawalRequestId],
    queryFn: () => fetchWithdrawalRequestQrCodeById(withdrawalRequestId),
    enabled: !!withdrawalRequestId,
    staleTime: 1000 * 60 * 5
  })

export const useWithdrawalRequestStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { withdrawalRequestId: string }>({
    mutationFn: ({ withdrawalRequestId }) =>
      updateWithdrawalRequestStatus(withdrawalRequestId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["withdrawal-requests"] })
      queryClient.invalidateQueries({
        queryKey: ["withdrawal-request", variables.withdrawalRequestId]
      })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    }
  })
}

export const useApproveWithdrawalRequest = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { withdrawalRequestId: string }>({
    mutationFn: ({ withdrawalRequestId }) =>
      approveWithdrawalRequest(withdrawalRequestId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["withdrawal-requests"] })
      queryClient.invalidateQueries({
        queryKey: ["withdrawal-request", variables.withdrawalRequestId]
      })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    }
  })
}

export const useRejectWithdrawalRequest = () => {
  const queryClient = useQueryClient()

  return useMutation<
    void,
    Error,
    { withdrawalRequestId: string; reason: string }
  >({
    mutationFn: ({ withdrawalRequestId, reason }) =>
      rejectWithdrawalRequest(withdrawalRequestId, reason),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["withdrawal-requests"] })
      queryClient.invalidateQueries({
        queryKey: ["withdrawal-request", variables.withdrawalRequestId]
      })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    }
  })
}
