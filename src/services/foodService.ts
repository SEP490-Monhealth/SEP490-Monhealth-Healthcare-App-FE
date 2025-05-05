import axios from "axios"
import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { CreateFoodType, FoodType } from "@/schemas/foodSchema"

interface FoodsResponse {
  totalPages: number
  totalItems: number
  foods: FoodType[]
}

export const fetchFoods = async (
  page: number,
  limit?: number,
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
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch foods"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch food"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const addFood = async (newData: CreateFoodType): Promise<string> => {
  try {
    const response = await monAPI.post("/foods/admin", newData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add food")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Failed to add food"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const updateFoodStatus = async (foodId: string): Promise<void> => {
  try {
    const response = await monAPI.patch(`/foods/${foodId}/status`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update food status")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update food status"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
