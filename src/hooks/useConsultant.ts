import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { ConsultantType } from "@/schemas/consultantSchema"

import {
  fetchConsultantById,
  fetchConsultants,
  updateConsultantStatus
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

export const useConsultantStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { consultantId: string }>({
    mutationFn: ({ consultantId }) => updateConsultantStatus(consultantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultants"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update consultant status")
    }
  })
}
