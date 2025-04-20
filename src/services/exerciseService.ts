import axios from "axios"
import { toast } from "sonner"

import { ExerciseTypeEnum } from "@/constants/enum/Workout"

import monAPI from "@/lib/monAPI"

import {
  CreateExerciseType,
  ExerciseType,
  UpdateExerciseType,
  WorkoutExercisesType
} from "@/schemas/exerciseSchema"

interface ExercisesResponse {
  totalPages: number
  totalItems: number
  exercises: ExerciseType[]
}

export const fetchExercises = async (
  page: number,
  limit?: number,
  type?: ExerciseTypeEnum,
  search?: string,
  status?: boolean
): Promise<ExercisesResponse> => {
  try {
    const response = await monAPI.get(`/exercises`, {
      params: { page, limit, type, search, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch exercises")
    }

    const { totalPages, totalItems, items: exercises } = data
    return { totalPages, totalItems, exercises }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch exercises"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchExercisesByWorkoutId = async (
  workoutId: string
): Promise<WorkoutExercisesType> => {
  try {
    const response = await monAPI.get(`/exercises/workout/${workoutId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch exercises")
    }

    return data as WorkoutExercisesType
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch exercises"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchExerciseById = async (
  exerciseId: string
): Promise<ExerciseType> => {
  try {
    const response = await monAPI.get(`/exercises/${exerciseId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch exercise")
    }

    return data as ExerciseType
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch exercise"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const addExercise = async (
  newExerciseData: CreateExerciseType
): Promise<string> => {
  try {
    const response = await monAPI.post("/exercises", newExerciseData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add exercise")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to add exercise"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const updateExercise = async (
  exerciseId: string,
  updatedData: UpdateExerciseType
): Promise<string> => {
  try {
    const response = await monAPI.put(`/exercises/${exerciseId}`, updatedData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update exercise")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update exercise"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const updateExerciseStatus = async (
  exerciseId: string
): Promise<void> => {
  try {
    const response = await monAPI.patch(`/exercises/${exerciseId}/status`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update exercise status")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update exercise status"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
