import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { BankType, CreateUpdateBankType } from "@/schemas/bankSchema"

import {
  addBank,
  fetchBankById,
  fetchBanks,
  updateBank,
  updateBankStatus
} from "@/services/bankService"

export const useBanks = (
  page: number,
  limit: number,
  search?: string,
  status?: boolean
) =>
  useQuery({
    queryKey: ["banks", page, limit, search, status],
    queryFn: () => fetchBanks(page, limit, search, status),
    staleTime: 1000 * 60 * 5
  })

export const useBankById = (bankId: string) =>
  useQuery<BankType, Error>({
    queryKey: ["bank", bankId],
    queryFn: () => fetchBankById(bankId),
    enabled: !!bankId
  })

export const useAddBank = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateUpdateBankType>({
    mutationFn: addBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] })
    }
  })
}

export const useUpdateBank = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { bankId: string; updatedData: CreateUpdateBankType }
  >({
    mutationFn: ({ bankId, updatedData }) => updateBank(bankId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] })
      queryClient.invalidateQueries({ queryKey: ["bank"] })
    }
  })
}

export const useBankStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { bankId: string }>({
    mutationFn: ({ bankId }) => updateBankStatus(bankId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] })
    }
  })
}
