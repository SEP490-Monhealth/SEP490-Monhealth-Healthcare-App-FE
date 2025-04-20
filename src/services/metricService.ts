import axios from "axios"
import { toast } from "sonner"

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
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch metrics"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
