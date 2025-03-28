import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { FoodType } from "@/schemas/foodSchema"

interface FoodsResponse {
  totalPages: number
  totalItems: number
  foods: FoodType[]
}

export const fetchFoods = async (
  page: number,
  limit: number,
  category?: string,
  search?: string,
  isPublic?: boolean,
  popular?: boolean,
  status?: boolean
): Promise<FoodsResponse> => {
  try {
    const response = await monAPI.get(`/foods`, {
      params: { page, limit, category, search, isPublic, popular, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch foods")
    }

    const { totalPages, totalItems, items: foods } = data
    return { totalPages, totalItems, foods }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch foods"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchFoodById = async (foodId: string): Promise<FoodType> => {
  try {
    const response = await monAPI.get(`/foods/${foodId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch food")
    }

    return data
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to fetch food"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
