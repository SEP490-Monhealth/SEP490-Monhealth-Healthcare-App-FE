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
  } catch (error) {
    console.error("Error fetching nutrition by ID:", error)
    throw new Error("Failed to fetch nutrition")
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
  } catch (error) {
    console.error("Error updating nutrition:", error)
    throw new Error("Failed to update nutrition")
  }
}
