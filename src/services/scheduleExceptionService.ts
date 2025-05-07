import axios from "axios"
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
  limit?: number,
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch schedule exceptions"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch schedule exception"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const approveScheduleException = async (
  scheduleExceptionId: string
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/schedule-exceptions/${scheduleExceptionId}/approve`
    )

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to approve schedule exception")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to approve schedule exception"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const rejectScheduleException = async (
  scheduleExceptionId: string
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/schedule-exceptions/${scheduleExceptionId}/reject`
    )

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to reject schedule exception")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to reject schedule exception"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
