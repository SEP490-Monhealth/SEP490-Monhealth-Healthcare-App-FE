import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { AllergyType, CreateUpdateAllergyType } from "@/schemas/allergySchema"

import {
  addAllergy,
  fetchAllergies,
  fetchAllergyById,
  updateAllergy
} from "@/services/allergyService"

export const useAllergies = (page: number, limit?: number, search?: string) =>
  useQuery({
    queryKey: ["allergies", page, limit, search],
    queryFn: () => fetchAllergies(page, limit, search),
    staleTime: 1000 * 60 * 5
  })

export const useAllergyById = (allergyId: string) =>
  useQuery<AllergyType, Error>({
    queryKey: ["allergy", allergyId],
    queryFn: () => fetchAllergyById(allergyId),
    enabled: !!allergyId
  })

export const useAddAllergy = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateUpdateAllergyType>({
    mutationFn: addAllergy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allergies"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add allergy")
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
      toast.success("Cập nhật danh mục dị ứng.")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update allergy")
    }
  })
}
