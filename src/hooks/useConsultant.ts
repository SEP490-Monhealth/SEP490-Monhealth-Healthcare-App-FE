import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ConsultantType } from "@/schemas/consultantSchema"

import {
  fetchConsultantById,
  fetchConsultants,
  rejectConsultant,
  updateConsultantStatus,
  verifyConsultant
} from "@/services/consultantService"

interface ConsultantsResponse {
  totalPages: number
  totalItems: number
  consultants: ConsultantType[]
}

export const useConsultants = (
  page: number,
  limit?: number,
  expertise?: string,
  search?: string,
  verified?: boolean,
  popular?: boolean,
  status?: boolean
) =>
  useQuery<ConsultantsResponse, Error>({
    queryKey: [
      "consultants",
      page,
      limit,
      expertise,
      search,
      verified,
      popular,
      status
    ],
    queryFn: () =>
      fetchConsultants(
        page,
        limit,
        expertise,
        search,
        verified,
        popular,
        status
      ),
    staleTime: 1000 * 60 * 5
  })

export const useConsultantById = (consultantId: string | undefined) =>
  useQuery<ConsultantType, Error>({
    queryKey: ["consultant", consultantId],
    queryFn: () => fetchConsultantById(consultantId),
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })

export const useVerifyConsultant = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { consultantId: string | undefined }>({
    mutationFn: ({ consultantId }) => verifyConsultant(consultantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] })
    }
  })
}

export const useRejectConsultant = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { consultantId: string | undefined }>({
    mutationFn: ({ consultantId }) => rejectConsultant(consultantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] })
    }
  })
}

export const useConsultantStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { consultantId: string | undefined }>({
    mutationFn: ({ consultantId }) => updateConsultantStatus(consultantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] })
    }
  })
}
