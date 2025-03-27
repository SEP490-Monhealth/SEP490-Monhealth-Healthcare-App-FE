import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

import { addPortion, fetchPortionsByFoodId } from "@/services/portionService"

export const usePortionsByFoodId = (foodId: string) =>
  useQuery<PortionType[], Error>({
    queryKey: ["portions", foodId],
    queryFn: () => fetchPortionsByFoodId(foodId),
    enabled: !!foodId
  })

export const useAddPortion = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreatePortionType>({
    mutationFn: addPortion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portions"] })
    }
  })
}
