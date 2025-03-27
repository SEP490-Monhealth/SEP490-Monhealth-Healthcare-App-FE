import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { AllergyType, CreateUpdateAllergyType } from "@/schemas/allergySchema"

interface AllergiesResponse {
  totalPages: number
  totalItems: number
  allergies: AllergyType[]
}

export const fetchAllergies = async (
  page: number,
  limit: number,
  search?: string
): Promise<AllergiesResponse> => {
  try {
    const response = await monAPI.get(`/allergies`, {
      params: { page, limit, search }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch allergies")
    }

    const { totalPages, totalItems, items: allergies } = data
    return { totalPages, totalItems, allergies }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch allergies"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchAllergyById = async (
  allergyId: string
): Promise<AllergyType> => {
  try {
    const response = await monAPI.get(`/allergies/${allergyId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch allergy")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch allergy"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const addAllergy = async (
  newData: CreateUpdateAllergyType
): Promise<string> => {
  try {
    const response = await monAPI.post("/allergies", newData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add allergy")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to add allergy"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const updateAllergy = async (
  allergyId: string,
  updatedData: CreateUpdateAllergyType
): Promise<string> => {
  try {
    const response = await monAPI.put(`/allergies/${allergyId}`, updatedData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update allergy")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to update allergy"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
