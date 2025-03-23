import monAPI from "@/lib/monAPI"

import { MetricType } from "@/schemas/metricSchema"

export const fetchMetricsByUserId = async (
  userId: string
): Promise<MetricType[]> => {
  try {
    const response = await monAPI.get(`/metrics/user/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch metrics")
    }

    return data
  } catch (error) {
    console.error("Error fetching metrics by user ID:", error)
    throw new Error("Failed to fetch metrics")
  }
}
