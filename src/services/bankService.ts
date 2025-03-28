import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { BankType, CreateUpdateBankType } from "@/schemas/bankSchema"

interface ExercisesResponse {
  totalPages: number
  totalItems: number
  banks: BankType[]
}

export const fetchBanks = async (
  page: number,
  limit: number,
  search?: string,
  status?: boolean
): Promise<ExercisesResponse> => {
  try {
    const response = await monAPI.get(`/banks`, {
      params: { page, limit, search, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch banks")
    }

    const { totalPages, totalItems, items: banks } = data
    return { totalPages, totalItems, banks }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch banks"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchBankById = async (bankId: string): Promise<BankType> => {
  try {
    const response = await monAPI.get(`/banks/${bankId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch bank")
    }

    return data
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to fetch bank"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const addBank = async (
  newBankData: CreateUpdateBankType
): Promise<string> => {
  try {
    const response = await monAPI.post("/banks", newBankData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add bank")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to add bank"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const updateBank = async (
  bankId: string,
  updatedData: CreateUpdateBankType
): Promise<string> => {
  try {
    const response = await monAPI.put(`/banks/${bankId}`, updatedData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update bank")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to update bank"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const updateBankStatus = async (bankId: string): Promise<void> => {
  try {
    const response = await monAPI.patch(`/banks/${bankId}/status`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update bank status")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to update bank status"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
