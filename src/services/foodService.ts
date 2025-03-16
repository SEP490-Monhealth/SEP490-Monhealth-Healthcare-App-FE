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
  } catch (error) {
    console.error("Error fetching foods:", error)
    throw new Error("Failed to fetch foods")
  }
}

export const fetchFoodById = async (userId: string): Promise<FoodType> => {
  try {
    const { data } = await monAPI.get(`/foods/${userId}`)
    return data
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    throw new Error("Failed to fetch user")
  }
}
