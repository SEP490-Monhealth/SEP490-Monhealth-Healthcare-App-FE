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
  search?: string,
  status?: boolean
): Promise<ConsultantsResponse> => {
  try {
    const response = await monAPI.get(`/consultants`, {
      params: { page, limit, search, status }
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
