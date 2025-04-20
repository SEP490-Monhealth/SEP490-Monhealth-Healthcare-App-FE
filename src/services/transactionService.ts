import axios from "axios"
import { toast } from "sonner"

import {
  TransactionStatusEnum,
  TransactionTypeEnum
} from "@/constants/enum/Transaction"

import monAPI from "@/lib/monAPI"

import {
  TransactionQrCodeType,
  TransactionType
} from "@/schemas/transactionSchema"

interface TransactionsResponse {
  totalPages: number
  totalItems: number
  transactions: TransactionType[]
}

export const fetchTransactions = async (
  page: number,
  limit?: number,
  type?: TransactionTypeEnum,
  search?: string,
  status?: TransactionStatusEnum
): Promise<TransactionsResponse> => {
  try {
    const response = await monAPI.get(`/transactions`, {
      params: { page, limit, type, search, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch transactions")
    }

    const { totalPages, totalItems, items: transactions } = data
    return { totalPages, totalItems, transactions }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch transactions"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchTransactionById = async (
  transactionId: string
): Promise<TransactionType> => {
  try {
    const response = await monAPI.get(`/transactions/${transactionId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch transaction")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch transaction"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchTransactionQrCodeById = async (
  transactionId: string
): Promise<TransactionQrCodeType> => {
  try {
    const response = await monAPI.get(`/transactions/${transactionId}/qr-code`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch transaction QR code")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch transaction QR code"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const completeTransaction = async (
  transactionId: string
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/transactions/${transactionId}/completed`
    )

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update transaction")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update transaction"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
