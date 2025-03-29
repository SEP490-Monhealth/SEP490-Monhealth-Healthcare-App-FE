import { useQuery } from "@tanstack/react-query"

import { ScheduleExceptionType } from "@/schemas/scheduleExceptionSchema"

import {
  fetchScheduleExceptionById,
  fetchScheduleExceptions
} from "@/services/scheduleExceptionService"

interface ScheduleExceptionsResponse {
  totalPages: number
  totalItems: number
  exceptions: ScheduleExceptionType[]
}

export const useScheduleExceptions = (
  page: number,
  limit: number,
  search?: string
) =>
  useQuery<ScheduleExceptionsResponse, Error>({
    queryKey: ["schedule-exceptions", page, limit, search],
    queryFn: () => fetchScheduleExceptions(page, limit, search),
    staleTime: 1000 * 60 * 5
  })

export const useScheduleExceptionById = (exceptionId: string) =>
  useQuery<ScheduleExceptionType, Error>({
    queryKey: ["schedule-exception", exceptionId],
    queryFn: () => fetchScheduleExceptionById(exceptionId),
    enabled: !!exceptionId,
    staleTime: 1000 * 60 * 5
  })
