import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  CreateWorkoutType,
  UpdateWorkoutType,
  WorkoutType
} from "@/schemas/workoutSchema"

import {
  addWorkout,
  fetchWorkoutById,
  fetchWorkouts,
  updateWorkout,
  updateWorkoutStatus
} from "@/services/workoutService"

import { DifficultyLevelEnum } from "./../constants/enum/Workout"

interface WorkoutsResponse {
  totalPages: number
  totalItems: number
  workouts: WorkoutType[]
}

export const useWorkout = (
  page: number,
  limit: number,
  category?: string,
  search?: string,
  difficulty?: DifficultyLevelEnum,
  popular?: boolean,
  status?: boolean
) =>
  useQuery<WorkoutsResponse, Error>({
    queryKey: [
      "workouts",
      page,
      limit,
      category,
      search,
      difficulty,
      popular,
      status
    ],
    queryFn: () =>
      fetchWorkouts(page, limit, category, search, difficulty, popular, status),
    staleTime: 1000 * 60 * 5
  })

export const useWorkoutById = (workoutId: string) =>
  useQuery<WorkoutType, Error>({
    queryKey: ["workout", workoutId],
    queryFn: () => fetchWorkoutById(workoutId),
    enabled: !!workoutId
  })

export const useAddWorkout = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateWorkoutType>({
    mutationFn: addWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] })
    }
  })
}

export const useUpdateWorkout = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { workoutId: string; updatedData: UpdateWorkoutType }
  >({
    mutationFn: ({ workoutId, updatedData }) =>
      updateWorkout(workoutId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] })
      queryClient.invalidateQueries({ queryKey: ["workout"] })
    }
  })
}

export const useWorkoutStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { workoutId: string }>({
    mutationFn: ({ workoutId }) => updateWorkoutStatus(workoutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] })
    }
  })
}
