import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  CreateUpdateExpertiseType,
  ExpertiseType
} from "@/schemas/expertiseSchema"

import {
  addExpertise,
  fetchExpertise,
  fetchExpertiseById,
  updateExpertise
} from "@/services/expertiseService"

interface ExpertiseResponse {
  totalPages: number
  totalItems: number
  expertise: ExpertiseType[]
}

export const useExpertise = (page: number, limit: number, search?: string) =>
  useQuery<ExpertiseResponse, Error>({
    queryKey: ["expertises", page, limit, search],
    queryFn: () => fetchExpertise(page, limit, search),
    staleTime: 1000 * 60 * 5
  })

export const useExpertiseById = (expertiseId: string) =>
  useQuery<ExpertiseType, Error>({
    queryKey: ["expertise", expertiseId],
    queryFn: () => fetchExpertiseById(expertiseId),
    enabled: !!expertiseId,
    staleTime: 1000 * 60 * 5
  })

export const useAddExpertise = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateUpdateExpertiseType>({
    mutationFn: addExpertise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expertises"] })
    }
  })
}

export const useUpdateExpertise = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { expertiseId: string; updatedData: CreateUpdateExpertiseType }
  >({
    mutationFn: ({ expertiseId, updatedData }) =>
      updateExpertise(expertiseId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expertises"] })
    }
  })
}
