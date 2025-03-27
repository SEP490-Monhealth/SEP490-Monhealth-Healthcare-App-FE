import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { NutritionType, UpdateNutritionType } from "@/schemas/nutritionSchema"

export const fetchNutritionByFoodId = async (
  foodId: string
): Promise<NutritionType> => {
  try {
    const response = await monAPI.get(`/nutrition/food/${foodId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch nutrition")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch nutrition"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const updateNutrition = async (
  nutritionId: string,
  updatedData: UpdateNutritionType
): Promise<string> => {
  try {
    const response = await monAPI.put(`/nutrition/${nutritionId}`, updatedData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update nutrition")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to update nutrition"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
