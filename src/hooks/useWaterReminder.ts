import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  CreateUpdateWaterReminderType,
  WaterReminderType
} from "@/schemas/waterReminderSchema"

import {
  addWaterReminder,
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

export const useAddWaterReminder = () => {
  const queryClient = useQueryClient()

  return useMutation<WaterReminderType, Error, CreateUpdateWaterReminderType>({
    mutationFn: addWaterReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["WaterReminders"] })
    }
  })
}
