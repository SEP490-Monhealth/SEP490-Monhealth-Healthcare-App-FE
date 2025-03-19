import { useQuery } from "@tanstack/react-query"

import { WaterReminderType } from "@/schemas/waterReminderSchema"

import {
  fetchWaterReminderById,
  fetchWaterReminders
} from "@/services/waterReminderService"

export const useWaterReminders = (
  page: number,
  limit: number,
  search?: string,
  recurring?: boolean,
  status?: boolean
) =>
  useQuery({
    queryKey: ["waterReminders", page, limit, search, recurring, status],
    queryFn: () => fetchWaterReminders(page, limit, search, recurring, status),
    staleTime: 1000 * 60 * 5
  })

export const useWaterReminderById = (waterReminderId: string) =>
  useQuery<WaterReminderType, Error>({
    queryKey: ["waterReminder", waterReminderId],
    queryFn: () => fetchWaterReminderById(waterReminderId),
    enabled: !!waterReminderId
  })
