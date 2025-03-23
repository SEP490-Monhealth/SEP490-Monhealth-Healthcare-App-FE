import { useQuery } from "@tanstack/react-query"

import { ConsultantType } from "@/schemas/consultantSchema"

import {
  fetchConsultantById,
  fetchConsultants
} from "@/services/consultantService"

export const useConsultants = (
  page: number,
  limit: number,
  expertise?: string,
  search?: string,
  verified?: boolean,
  status?: boolean
) =>
  useQuery({
    queryKey: ["consultants", page, limit, expertise, search, verified, status],
    queryFn: () =>
      fetchConsultants(page, limit, expertise, search, verified, status),
    staleTime: 1000 * 60 * 5
  })

export const useConsultantById = (consultantId: string) =>
  useQuery<ConsultantType, Error>({
    queryKey: ["consultant", consultantId],
    queryFn: () => fetchConsultantById(consultantId),
    enabled: !!consultantId
  })
