import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  CreateUpdateExpertiseType,
  ExpertiseType
} from "@/schemas/expertiseSchema"

import {
  addExpertise,
  fetchExpertise,
  fetchExpertiseById
} from "@/services/expertiseService"

export const useExpertise = (
  page: number,
  limit: number,
  search?: string,
  role?: string,
  status?: boolean
) =>
  useQuery({
    queryKey: ["expertise-all", page, limit, search, role, status],
    queryFn: () => fetchExpertise(page, limit, search, role, status),
    staleTime: 1000 * 60 * 5
  })

export const useExpertiseById = (expertiseId: string) =>
  useQuery<ExpertiseType, Error>({
    queryKey: ["expertise", expertiseId],
    queryFn: () => fetchExpertiseById(expertiseId),
    enabled: !!expertiseId
  })

export const useAddExpertise = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateUpdateExpertiseType>({
    mutationFn: addExpertise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expertise-all"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add Expertise")
    }
  })
}
