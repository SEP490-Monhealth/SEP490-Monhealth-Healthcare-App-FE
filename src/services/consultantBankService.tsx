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
      throw new Error(message || "Failed to fetch consultantBanks")
    }

    const { totalPages, totalItems, items: consultantBanks } = data
    return { totalPages, totalItems, consultantBanks }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch consultantBanks"
    toast.error(errorMessage)
    throw new Error(errorMessage)
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
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch consultant bank"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
