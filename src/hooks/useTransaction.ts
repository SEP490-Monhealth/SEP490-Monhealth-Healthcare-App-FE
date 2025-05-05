import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  TransactionStatusEnum,
  TransactionTypeEnum
} from "@/constants/enum/Transaction"

import {
  TransactionQrCodeType,
  TransactionType
} from "@/schemas/transactionSchema"

import {
  completeTransaction,
  failTransaction,
  fetchTransactionById,
  fetchTransactionQrCodeById,
  fetchTransactions
} from "@/services/transactionService"

interface TransactionsResponse {
  totalPages: number
  totalItems: number
  transactions: TransactionType[]
}

export const useTransactions = (
  page: number,
  limit?: number,
  type?: TransactionTypeEnum,
  search?: string,
  status?: TransactionStatusEnum
) =>
  useQuery<TransactionsResponse, Error>({
    queryKey: ["transactions", page, limit, search, type, status],
    queryFn: () => fetchTransactions(page, limit, type, search, status),
    staleTime: 1000 * 60 * 5
  })

export const useTransactionById = (transactionId: string) =>
  useQuery<TransactionType, Error>({
    queryKey: ["transaction", transactionId],
    queryFn: () => fetchTransactionById(transactionId),
    enabled: !!transactionId,
    staleTime: 1000 * 60 * 5
  })

export const useTransactionQrCodeById = (transactionId: string) =>
  useQuery<TransactionQrCodeType, Error>({
    queryKey: ["transaction-qr-code", transactionId],
    queryFn: () => fetchTransactionQrCodeById(transactionId),
    enabled: !!transactionId,
    staleTime: 1000 * 60 * 5
  })

export const useCompleteTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, { transactionId: string }>({
    mutationFn: ({ transactionId }) => completeTransaction(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["transaction"] })
    }
  })
}

export const useFailTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, { transactionId: string }>({
    mutationFn: ({ transactionId }) => failTransaction(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["transaction"] })
    }
  })
}
