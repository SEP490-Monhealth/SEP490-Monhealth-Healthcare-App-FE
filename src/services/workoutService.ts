import axios from "axios"
import { toast } from "sonner"

import { DifficultyLevelEnum } from "@/constants/enum/Workout"

import monAPI from "@/lib/monAPI"

import {
  CreateWorkoutType,
  UpdateWorkoutType,
  WorkoutType
} from "@/schemas/workoutSchema"

interface WorkoutsResponse {
  totalPages: number
  totalItems: number
  workouts: WorkoutType[]
}

export const fetchWorkouts = async (
  page: number,
  limit?: number,
  category?: string,
  search?: string,
  difficulty?: DifficultyLevelEnum,
  popular?: boolean,
  status?: boolean
): Promise<WorkoutsResponse> => {
  try {
    const response = await monAPI.get(`/workouts`, {
      params: { page, limit, category, search, difficulty, popular, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch workouts")
    }

    const { totalPages, totalItems, items: workouts } = data
    return { totalPages, totalItems, workouts }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch workouts"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchWorkoutById = async (
  workoutId: string
): Promise<WorkoutType> => {
  try {
    const response = await monAPI.get(`/workouts/${workoutId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch workout")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch workout"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const addWorkout = async (
  newWorkoutData: CreateWorkoutType
): Promise<string> => {
  try {
    const response = await monAPI.post("/workouts", newWorkoutData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add workout")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to add workout"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const updateWorkout = async (
  workoutId: string,
  updatedData: UpdateWorkoutType
): Promise<string> => {
  try {
    const response = await monAPI.patch(`/workouts/${workoutId}`, updatedData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update workout")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update workout"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const updateWorkoutStatus = async (workoutId: string): Promise<void> => {
  try {
    const response = await monAPI.patch(`/workouts/${workoutId}/status`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update workout status")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update workout status"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
