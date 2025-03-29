import { toast } from "sonner"

import { BookingStatusEnum } from "@/constants/enum/Booking"

import monAPI from "@/lib/monAPI"

import { ScheduleExceptionType } from "@/schemas/scheduleExceptionSchema"

interface ScheduleExceptionsResponse {
  totalPages: number
  totalItems: number
  exceptions: ScheduleExceptionType[]
}

export const fetchScheduleExceptions = async (
  page: number,
  limit: number,
  search?: string
): Promise<ScheduleExceptionsResponse> => {
  try {
    const response = await monAPI.get(`/schedule-exception`, {
      params: { page, limit, search }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch schedule-exception")
    }

    const { totalPages, totalItems, items: exceptions } = data
    return { totalPages, totalItems, exceptions }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch schedule-exception"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchScheduleExceptionById = async (
  exceptionId: string
): Promise<ScheduleExceptionType> => {
  try {
    const response = await monAPI.get(`/schedule-exception/${exceptionId}`)

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
