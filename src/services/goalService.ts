import axios from "axios"
import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { GoalType } from "@/schemas/goalSchema"

export const fetchGoalsByUserId = async (
  userId: string
): Promise<GoalType[]> => {
  try {
    const response = await monAPI.get(`/goals/user/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch goals")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch goals"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
