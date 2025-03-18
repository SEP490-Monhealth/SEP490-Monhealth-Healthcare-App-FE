import { useQuery } from "@tanstack/react-query"

import { ConsultantType } from "@/schemas/consultantSchema"

import {
  fetchConsultantById,
  fetchConsultants
} from "@/services/consultantService"

export const useConsultants = (
  page: number,
  limit: number,
  search?: string,
  status?: boolean
) =>
  useQuery({
    queryKey: ["consultants", page, limit, search, status],
    queryFn: () => fetchConsultants(page, limit, search, status),
    staleTime: 1000 * 60 * 5
  })

export const useConsultantById = (consultantId: string) =>
  useQuery<ConsultantType, Error>({
    queryKey: ["consultant", consultantId],
    queryFn: () => fetchConsultantById(consultantId),
    enabled: !!consultantId
  })
