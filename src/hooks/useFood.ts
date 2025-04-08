import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { CreateFoodType, FoodType, UpdateFoodType } from "@/schemas/foodSchema"

import {
  addFood,
  fetchFoodById,
  fetchFoods,
  updateFood,
  updateFoodStatus
} from "@/services/foodService"

interface FoodsResponse {
  totalPages: number
  totalItems: number
  foods: FoodType[]
}

export const useFoods = (
  page: number,
  limit?: number,
  category?: string,
  search?: string,
  isPublic?: boolean,
  popular?: boolean,
  status?: boolean
) =>
  useQuery<FoodsResponse, Error>({
    queryKey: [
      "foods",
      page,
      limit,
      category,
      search,
      isPublic,
      popular,
      status
    ],
    queryFn: () =>
      fetchFoods(page, limit, category, search, isPublic, popular, status),
    staleTime: 1000 * 60 * 5
  })

export const useFoodById = (foodId: string) =>
  useQuery<FoodType, Error>({
    queryKey: ["food", foodId],
    queryFn: () => fetchFoodById(foodId),
    enabled: !!foodId,
    staleTime: 1000 * 60 * 5
  })

export const useAddFood = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateFoodType>({
    mutationFn: addFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] })
    }
  })
}

export const useUpdateFood = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { foodId: string; updatedData: UpdateFoodType }
  >({
    mutationFn: ({ foodId, updatedData }) => updateFood(foodId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] })
      queryClient.invalidateQueries({ queryKey: ["food"] })
    }
  })
}

export const useFoodStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { foodId: string }>({
    mutationFn: ({ foodId }) => updateFoodStatus(foodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] })
    }
  })
}
