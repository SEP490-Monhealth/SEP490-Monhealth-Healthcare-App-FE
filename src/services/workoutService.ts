import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { CreateWorkoutType, WorkoutType } from "@/schemas/workoutSchema"

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
  difficulty?: number,
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
    console.error("Error fetching workouts:", error)
    throw new Error("Failed to fetch workouts")
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
    console.error("Error fetching workout by ID:", error)
    throw new Error("Failed to fetch workout")
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
    console.error("Error adding workout:", error)
    throw new Error("Failed to add workout")
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
    console.error("Error updating workout status:", error)
    throw new Error("Failed to update workout status")
  }
}
