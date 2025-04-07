import { useQuery } from "@tanstack/react-query"

import { ConsultantBankType } from "@/schemas/consultantBankSchema"

import {
  fetchConsultantBankById,
  fetchConsultantBanks
} from "@/services/consultantBankService"

interface ConsultantBanksResponse {
  totalPages: number
  totalItems: number
  consultantBanks: ConsultantBankType[]
}

export const useConsultantBanks = (
  page: number,
  limit?: number,
  search?: string
) =>
  useQuery<ConsultantBanksResponse, Error>({
    queryKey: ["consultant-banks", page, limit, search],
    queryFn: () => fetchConsultantBanks(page, limit, search),
    staleTime: 1000 * 60 * 5
  })

export const useConsultantBankById = (consultantBankId: string) =>
  useQuery<ConsultantBankType, Error>({
    queryKey: ["consultant-bank", consultantBankId],
    queryFn: () => fetchConsultantBankById(consultantBankId),
    enabled: !!consultantBankId,
    staleTime: 1000 * 60 * 5
  })
