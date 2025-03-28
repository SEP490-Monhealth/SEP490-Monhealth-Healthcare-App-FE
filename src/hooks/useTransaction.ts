import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  TransactionStatusEnum,
  TransactionTypeEnum
} from "@/constants/enum/Transaction"

import {
  TransactionType,
  UpdateTransactionType
} from "@/schemas/transactionSchema"

import {
  fetchTransactionById,
  fetchTransactions,
  updateTransactionStatus
} from "@/services/transactionService"

interface TransactionsResponse {
  totalPages: number
  totalItems: number
  transactions: TransactionType[]
}

export const useTransactions = (
  page: number,
  limit: number,
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
    enabled: !!transactionId
  })

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { transactionId: string; updatedData: UpdateTransactionType }
  >({
    mutationFn: ({ transactionId, updatedData }) =>
      updateTransactionStatus(transactionId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["transaction"] })
    }
  })
}
