import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { CreateWorkoutType, WorkoutType } from "@/schemas/workoutSchema"

import {
  addWorkout,
  fetchWorkoutById,
  fetchWorkouts,
  updateWorkoutStatus
} from "@/services/workoutService"

export const useWorkout = (
  page: number,
  limit?: number,
  category?: string,
  search?: string,
  difficulty?: number,
  popular?: boolean,
  status?: boolean
) =>
  useQuery({
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
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add workout")
    }
  })
}

export const useWorkoutStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { workoutId: string }>({
    mutationFn: ({ workoutId }) => updateWorkoutStatus(workoutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] })
      queryClient.invalidateQueries({ queryKey: ["workout"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update workout status")
    }
  })
}
