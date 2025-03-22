import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

interface PortionsResponse {
  totalPages: number
  totalItems: number
  portions: PortionType[]
}

export const fetchPortions = async (
  page: number,
  limit?: number,
  search?: string,
  sort?: string,
  order?: string
): Promise<PortionsResponse> => {
  try {
    const response = await monAPI.get(`/portions`, {
      params: { page, limit, search, sort, order }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch portions")
    }

    const { totalPages, totalItems, items: portions } = data
    return { totalPages, totalItems, portions }
  } catch (error) {
    console.error("Error fetching portions:", error)
    throw new Error("Failed to fetch portions")
  }
}

export const fetchPortionById = async (
  portionId: string
): Promise<PortionType> => {
  try {
    const response = await monAPI.get(`/portions/${portionId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch portion")
    }

    return data
  } catch (error) {
    console.error("Error fetching portion by ID:", error)
    throw new Error("Failed to fetch portion")
  }
}

export const addPortion = async (
  newPortionData: CreatePortionType
): Promise<string> => {
  try {
    const response = await monAPI.post("/portions", newPortionData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add portion")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error adding portion:", error)
    throw new Error("Failed to add portion")
  }
}
