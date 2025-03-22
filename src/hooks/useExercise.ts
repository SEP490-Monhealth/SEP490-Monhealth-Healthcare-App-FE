import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { CreateExerciseType, ExerciseType } from "@/schemas/exerciseSchema"

import {
  addExercise,
  fetchExerciseById,
  fetchExercises,
  updateExerciseStatus
} from "@/services/exerciseService"

export const useUsers = (
  page: number,
  limit?: number,
  search?: string,
  type?: number,
  status?: boolean
) =>
  useQuery({
    queryKey: ["exercises", page, limit, search, type, status],
    queryFn: () => fetchExercises(page, limit, search, type, status),
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
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add exercise")
    }
  })
}

export const useExerciseStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { exerciseId: string }>({
    mutationFn: ({ exerciseId }) => updateExerciseStatus(exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] })
      queryClient.invalidateQueries({ queryKey: ["exercise"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update exercise status")
    }
  })
}
