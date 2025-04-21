import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ScheduleExceptionType } from "@/schemas/scheduleExceptionSchema"

import {
  fetchScheduleExceptionById,
  fetchScheduleExceptions,
  updateScheduleExceptionStatus
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

export const useScheduleExceptionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { scheduleExceptionId: string }>({
    mutationFn: ({ scheduleExceptionId }) =>
      updateScheduleExceptionStatus(scheduleExceptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-exceptions"] })
    }
  })
}
