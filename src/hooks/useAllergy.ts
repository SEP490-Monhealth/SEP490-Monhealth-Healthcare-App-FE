import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { AllergyType, CreateUpdateAllergyType } from "@/schemas/allergySchema"

import {
  addAllergy,
  fetchAllergies,
  fetchAllergyById,
  updateAllergy
} from "@/services/allergyService"

interface AllergiesResponse {
  totalPages: number
  totalItems: number
  allergies: AllergyType[]
}

export const useAllergies = (page: number, limit: number, search?: string) =>
  useQuery<AllergiesResponse, Error>({
    queryKey: ["allergies", page, limit, search],
    queryFn: () => fetchAllergies(page, limit, search),
    staleTime: 1000 * 60 * 5
  })

export const useAllergyById = (allergyId: string) =>
  useQuery<AllergyType, Error>({
    queryKey: ["allergy", allergyId],
    queryFn: () => fetchAllergyById(allergyId),
    enabled: !!allergyId,
    staleTime: 1000 * 60 * 5
  })

export const useAddAllergy = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateUpdateAllergyType>({
    mutationFn: addAllergy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allergies"] })
    }
  })
}

export const useUpdateAllergy = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { allergyId: string; updatedData: CreateUpdateAllergyType }
  >({
    mutationFn: ({ allergyId, updatedData }) =>
      updateAllergy(allergyId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allergies"] })
      queryClient.invalidateQueries({ queryKey: ["allergy"] })
    }
  })
}
