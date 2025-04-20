import axios from "axios"
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
  limit?: number,
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
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch expertise"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
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
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch expertise"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const addExpertise = async (
  newData: CreateUpdateExpertiseType
): Promise<string> => {
  try {
    const response = await monAPI.post("/expertise", newData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add expertise")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to add expertise"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const updateExpertise = async (
  expertiseId: string,
  updatedData: CreateUpdateExpertiseType
): Promise<string> => {
  try {
    const response = await monAPI.put(`/expertise/${expertiseId}`, updatedData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update expertise")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to update expertise"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
