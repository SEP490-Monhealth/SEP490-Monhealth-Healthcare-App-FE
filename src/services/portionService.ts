import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { CreatePortionType, PortionType } from "@/schemas/portionSchema"

interface PortionsResponse {
  totalPages: number
  totalItems: number
  portions: PortionType[]
}

export const fetchPortionsByFoodId = async (
  foodId: string,
  page: number,
  limit: number,
  search?: string,
  sort?: string,
  order?: string
): Promise<PortionsResponse> => {
  try {
    const response = await monAPI.get(`/portions/food/${foodId}`, {
      params: { page, limit, search, sort, order }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch portions")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch portions"
    toast.error(errorMessage)
    throw new Error(errorMessage)
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
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to add portion"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
