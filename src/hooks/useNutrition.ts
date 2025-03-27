import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { NutritionType, UpdateNutritionType } from "@/schemas/nutritionSchema"

import {
  fetchNutritionByFoodId,
  updateNutrition
} from "@/services/nutritionService"

export const useNutritionByFoodId = (foodId: string) =>
  useQuery<NutritionType, Error>({
    queryKey: ["nutrition", foodId],
    queryFn: () => fetchNutritionByFoodId(foodId),
    enabled: !!foodId
  })

export const useUpdateNutrition = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { nutritionId: string; updatedData: UpdateNutritionType }
  >({
    mutationFn: ({ nutritionId, updatedData }) =>
      updateNutrition(nutritionId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] })
      queryClient.invalidateQueries({ queryKey: ["food"] })
      queryClient.invalidateQueries({ queryKey: ["nutrition"] })
    }
  })
}
