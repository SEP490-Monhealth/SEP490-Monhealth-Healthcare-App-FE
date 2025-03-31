import { useQuery } from "@tanstack/react-query"

import { FoodType } from "@/schemas/foodSchema"

import { fetchFoodById, fetchFoods } from "@/services/foodService"

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
