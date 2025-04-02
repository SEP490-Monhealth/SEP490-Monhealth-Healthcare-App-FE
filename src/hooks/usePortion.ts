import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

import {
  addPortion,
  fetchPortionById,
  fetchPortionsByFoodId
} from "@/services/portionService"

interface PortionsResponse {
  totalPages: number
  totalItems: number
  portions: PortionType[]
}

export const usePortionsByFoodId = (
  foodId: string,
  page: number,
  limit?: number,
  search?: string,
  sort?: string,
  order?: string
) =>
  useQuery<PortionsResponse, Error>({
    queryKey: ["portions", foodId, page, limit, search, sort, order],
    queryFn: () =>
      fetchPortionsByFoodId(foodId, page, limit, search, sort, order),
    enabled: !!foodId,
    staleTime: 1000 * 60 * 5
  })

export const usePortionById = (portionId: string) =>
  useQuery<PortionType, Error>({
    queryKey: ["portion", portionId],
    queryFn: () => fetchPortionById(portionId),
    enabled: !!portionId,
    staleTime: 1000 * 60 * 5
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
