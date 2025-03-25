import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { ConsultantType } from "@/schemas/consultantSchema"

interface ConsultantsResponse {
  totalPages: number
  totalItems: number
  consultants: ConsultantType[]
}

export const fetchConsultants = async (
  page: number,
  limit: number,
  expertise?: string,
  search?: string,
  verified?: boolean,
  status?: boolean
): Promise<ConsultantsResponse> => {
  try {
    const response = await monAPI.get(`/consultants`, {
      params: { page, limit, expertise, search, verified, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch consultants")
    }

    const { totalPages, totalItems, items: consultants } = data
    return { totalPages, totalItems, consultants }
  } catch (error) {
    console.error("Error fetching consultants:", error)
    throw new Error("Failed to fetch consultants")
  }
}

export const fetchConsultantById = async (
  consultantId: string
): Promise<ConsultantType> => {
  try {
    const response = await monAPI.get(`/consultants/${consultantId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch consultant")
    }

    return data
  } catch (error) {
    console.error("Error fetching consultant by ID:", error)
    throw new Error("Failed to fetch consultant")
  }
}

export const updateConsultantStatus = async (
  consultantId: string
): Promise<void> => {
  try {
    const response = await monAPI.patch(`/consultants/${consultantId}/status`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update consultant status")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error updating consultant status:", error)
    throw new Error("Failed to update consultant status")
  }
}

export const updateConsultantVerify = async (
  consultantId: string
): Promise<void> => {
  try {
    const response = await monAPI.patch(`/consultants/${consultantId}/verify`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update consultant verify")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error updating consultant verify:", error)
    throw new Error("Failed to update consultant verify")
  }
}
