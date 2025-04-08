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
  limit?: number,
  expertise?: string,
  search?: string,
  verified?: boolean,
  popular?: boolean,
  status?: boolean
): Promise<ConsultantsResponse> => {
  try {
    const response = await monAPI.get(`/consultants`, {
      params: { page, limit, expertise, search, verified, popular, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch consultants")
    }

    const { totalPages, totalItems, items: consultants } = data
    return { totalPages, totalItems, consultants }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch consultants"
    toast.error(errorMessage)
    throw new Error(errorMessage)
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
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch consultant"
    toast.error(errorMessage)
    throw new Error(errorMessage)
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
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to update consultant status"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
