import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { ExerciseTypeEnum } from "@/constants/enum/Workout"

import {
  CreateExerciseType,
  ExerciseType,
  ExerciseWorkoutType,
  UpdateExerciseType
} from "@/schemas/exerciseSchema"

import {
  addExercise,
  fetchExerciseById,
  fetchExerciseByWorkoutId,
  fetchExercises,
  updateExercise,
  updateExerciseStatus
} from "@/services/exerciseService"

export const useExercises = (
  page: number,
  limit: number,
  type?: ExerciseTypeEnum,
  search?: string,
  status?: boolean
) =>
  useQuery({
    queryKey: ["exercises", page, limit, type, search, status],
    queryFn: () => fetchExercises(page, limit, type, search, status),
    staleTime: 1000 * 60 * 5
  })

export const useExerciseById = (exerciseId: string) =>
  useQuery<ExerciseType, Error>({
    queryKey: ["exercise", exerciseId],
    queryFn: () => fetchExerciseById(exerciseId),
    enabled: !!exerciseId
  })

export const useAddExercise = () => {
  const queryClient = useQueryClient()

  return useMutation<string, Error, CreateExerciseType>({
    mutationFn: addExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] })
    }
  })
}

export const useUpdateExercise = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { exerciseId: string; updatedData: UpdateExerciseType }
  >({
    mutationFn: ({ exerciseId, updatedData }) =>
      updateExercise(exerciseId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] })
      queryClient.invalidateQueries({ queryKey: ["exercise"] })
    }
  })
}

export const useExerciseStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { exerciseId: string }>({
    mutationFn: ({ exerciseId }) => updateExerciseStatus(exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update exercise status")
    }
  })
}

export const useExerciseByWorkoutId = (workoutId: string) =>
  useQuery<ExerciseWorkoutType, Error>({
    queryKey: ["exerciseWorkout", workoutId],
    queryFn: () => fetchExerciseByWorkoutId(workoutId),
    enabled: !!workoutId
  })
