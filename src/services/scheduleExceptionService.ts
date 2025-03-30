import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { ScheduleExceptionType } from "@/schemas/scheduleExceptionSchema"

interface ScheduleExceptionsResponse {
  totalPages: number
  totalItems: number
  scheduleExceptions: ScheduleExceptionType[]
}

export const fetchScheduleExceptions = async (
  page: number,
  limit: number,
  search?: string
): Promise<ScheduleExceptionsResponse> => {
  try {
    const response = await monAPI.get(`/schedule-exceptions`, {
      params: { page, limit, search }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch schedule exceptions")
    }

    const { totalPages, totalItems, items: scheduleExceptions } = data
    return { totalPages, totalItems, scheduleExceptions }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch schedule exceptions"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchScheduleExceptionById = async (
  scheduleExceptionId: string
): Promise<ScheduleExceptionType> => {
  try {
    const response = await monAPI.get(
      `/schedule-exceptions/${scheduleExceptionId}`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch schedule exception")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch schedule exception"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
