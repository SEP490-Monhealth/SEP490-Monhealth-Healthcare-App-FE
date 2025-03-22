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
  limit?: number,
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
  } catch (error) {
    console.error("Error fetching allergies:", error)
    throw new Error("Failed to fetch allergies")
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
  } catch (error) {
    console.error("Error fetching allergy by ID:", error)
    throw new Error("Failed to fetch allergy")
  }
}

export const addAllergy = async (
  newAllergyData: CreateUpdateAllergyType
): Promise<string> => {
  try {
    const response = await monAPI.post("/allergies", newAllergyData)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to add allergy")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error adding allergy:", error)
    throw new Error("Failed to add allergy")
  }
}

export const updateAllergy = async (
  allergyId: string,
  updatedAllergyData: CreateUpdateAllergyType
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/allergies/${allergyId}`,
      updatedAllergyData
    )

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to update allergy")
    }

    toast.success(message)
    return message
  } catch (error) {
    console.error("Error updating allergy:", error)
    throw new Error("Failed to update allergy")
  }
}
