import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import {
  CreateUpdateWaterReminderType,
  WaterReminderType
} from "@/schemas/waterReminderSchema"

interface WaterRemindersResponse {
  totalPages: number
  totalItems: number
  waterReminders: WaterReminderType[]
}

export const fetchWaterReminders = async (
  page: number,
  limit: number,
  search?: string,
  recurring?: boolean,
  status?: boolean
): Promise<WaterRemindersResponse> => {
  try {
    const response = await monAPI.get(`/water-reminders`, {
      params: { page, limit, search, recurring, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch water reminders")
    }

    const { totalPages, totalItems, items: waterReminders } = data
    return { totalPages, totalItems, waterReminders }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch water reminders"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchWaterReminderById = async (
  waterReminderId: string
): Promise<WaterReminderType> => {
  try {
    const response = await monAPI.get(`/water-reminders/${waterReminderId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch water reminder")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch water reminder"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const addWaterReminder = async (
  newWaterReminderData: CreateUpdateWaterReminderType
): Promise<WaterReminderType> => {
  try {
    const response = await monAPI.post("/water-reminders", newWaterReminderData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add water reminder")
    }

    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to add water reminder"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
