import { toast } from "sonner"

import { WithdrawalRequestStatusEnum } from "@/constants/enum/WithdrawalRequest"

import monAPI from "@/lib/monAPI"

import { WithdrawalRequestType } from "@/schemas/withdrawalRequestSchema"

interface WithdrawalRequestResponse {
  totalPages: number
  totalItems: number
  withdrawalRequests: WithdrawalRequestType[]
}

export const fetchWithdrawalRequests = async (
  page: number,
  limit?: number,
  search?: string,
  status?: WithdrawalRequestStatusEnum
): Promise<WithdrawalRequestResponse> => {
  try {
    const response = await monAPI.get(`/withdrawal-requests`, {
      params: { page, limit, search, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch withdrawal requests")
    }

    const { totalPages, totalItems, items: withdrawalRequests } = data
    return { totalPages, totalItems, withdrawalRequests }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch withdrawal requests"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchWithdrawalRequestById = async (
  withdrawalRequestId: string
): Promise<WithdrawalRequestType> => {
  try {
    const response = await monAPI.get(
      `/withdrawal-requests/${withdrawalRequestId}`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch withdrawal request")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch withdrawal request"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const updateWithdrawalRequestStatus = async (
  withdrawalRequestId: string
): Promise<void> => {
  try {
    const response = await monAPI.patch(
      `/withdrawal-requests/${withdrawalRequestId}/status`
    )

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update withdrawal request status")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Failed to update withdrawal request status"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const approveWithdrawalRequest = async (
  withdrawalRequestId: string
): Promise<void> => {
  try {
    const response = await monAPI.patch(
      `/withdrawal-requests/${withdrawalRequestId}/approve`
    )

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to approve withdrawal request")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to approve withdrawal request"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const rejectWithdrawalRequest = async (
  withdrawalRequestId: string,
  reason: string
): Promise<void> => {
  try {
    const response = await monAPI.put(
      `/withdrawal-requests/${withdrawalRequestId}/reject`,
      { reason }
    )

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to reject withdrawal request")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to reject withdrawal request"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
