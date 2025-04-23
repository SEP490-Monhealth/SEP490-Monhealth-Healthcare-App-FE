import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ScheduleExceptionType } from "@/schemas/scheduleExceptionSchema"

import {
  approveScheduleException,
  fetchScheduleExceptionById,
  fetchScheduleExceptions,
  rejectScheduleException
} from "@/services/scheduleExceptionService"

interface ScheduleExceptionsResponse {
  totalPages: number
  totalItems: number
  scheduleExceptions: ScheduleExceptionType[]
}

export const useScheduleExceptions = (
  page: number,
  limit?: number,
  search?: string
) =>
  useQuery<ScheduleExceptionsResponse, Error>({
    queryKey: ["schedule-exceptions", page, limit, search],
    queryFn: () => fetchScheduleExceptions(page, limit, search),
    staleTime: 1000 * 60 * 5
  })

export const useScheduleExceptionById = (scheduleExceptionId: string) =>
  useQuery<ScheduleExceptionType, Error>({
    queryKey: ["schedule-exception", scheduleExceptionId],
    queryFn: () => fetchScheduleExceptionById(scheduleExceptionId),
    enabled: !!scheduleExceptionId,
    staleTime: 1000 * 60 * 5
  })

export const useApproveScheduleException = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { scheduleExceptionId: string | undefined }
  >({
    mutationFn: ({ scheduleExceptionId }) =>
      approveScheduleException(scheduleExceptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-exceptions"] })
      queryClient.invalidateQueries({ queryKey: ["schedule-exception"] })
    }
  })
}

export const useRejectScheduleException = () => {
  const queryClient = useQueryClient()

  return useMutation<
    string,
    Error,
    { scheduleExceptionId: string | undefined }
  >({
    mutationFn: ({ scheduleExceptionId }) =>
      rejectScheduleException(scheduleExceptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-exceptions"] })
      queryClient.invalidateQueries({ queryKey: ["schedule-exception"] })
    }
  })
}
