import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import {
  CreateUpdateExpertiseType,
  ExpertiseType
} from "@/schemas/expertiseSchema"

interface ExpertiseResponse {
  totalPages: number
  totalItems: number
  expertise: ExpertiseType[]
}

export const fetchExpertise = async (
  page: number,
  limit: number,
  search?: string
): Promise<ExpertiseResponse> => {
  try {
    const response = await monAPI.get(`/expertise`, {
      params: { page, limit, search }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch expertise")
    }

    const { totalPages, totalItems, items: expertise } = data
    return { totalPages, totalItems, expertise }
  } catch (error) {
    console.error("Error fetching expertise:", error)
    throw new Error("Failed to fetch expertise")
  }
}

export const fetchExpertiseById = async (
  expertiseId: string
): Promise<ExpertiseType> => {
  try {
    const response = await monAPI.get(`/expertise/${expertiseId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch expertise")
    }

    return data
  } catch (error) {
    console.error("Error fetching expertise by ID:", error)
    throw new Error("Failed to fetch expertise")
  }
}

export const addExpertise = async (
  newExpertiseData: CreateUpdateExpertiseType
): Promise<string> => {
  try {
    const response = await monAPI.post("/expertise", newExpertiseData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add expertise")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error adding expertise:", error)
    throw new Error("Failed to add expertise")
  }
}
