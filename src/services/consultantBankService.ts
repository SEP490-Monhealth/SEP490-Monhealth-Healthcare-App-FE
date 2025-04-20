import axios from "axios"
import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { ConsultantBankType } from "@/schemas/consultantBankSchema"

interface ConsultantBanksResponse {
  totalPages: number
  totalItems: number
  consultantBanks: ConsultantBankType[]
}

export const fetchConsultantBanks = async (
  page: number,
  limit?: number,
  search?: string
): Promise<ConsultantBanksResponse> => {
  try {
    const response = await monAPI.get(`/consultant-banks`, {
      params: { page, limit, search }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch consultant banks")
    }

    const { totalPages, totalItems, items: consultantBanks } = data
    return { totalPages, totalItems, consultantBanks }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch consultant banks"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchConsultantBankById = async (
  consultantBankId: string
): Promise<ConsultantBankType> => {
  try {
    const response = await monAPI.get(`/consultant-banks/${consultantBankId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch consultant bank")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch consultant bank"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
