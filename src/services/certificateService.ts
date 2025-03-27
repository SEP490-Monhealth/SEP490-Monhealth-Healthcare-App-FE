import { toast } from "sonner"

import monAPI from "@/lib/monAPI"

import { CertificateType } from "@/schemas/certificateSchema"

interface CertificatesResponse {
  totalPages: number
  totalItems: number
  certificates: CertificateType[]
}

export const fetchCertificates = async (
  page: number,
  limit: number,
  search?: string,
  verified?: boolean
): Promise<CertificatesResponse> => {
  try {
    const response = await monAPI.get(`/certificates`, {
      params: { page, limit, search, verified }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch certificates")
    }

    const { totalPages, totalItems, items: certificates } = data
    return { totalPages, totalItems, certificates }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch certificates"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchCertificateById = async (
  certificateId: string
): Promise<CertificateType> => {
  try {
    const response = await monAPI.get(`/certificates/${certificateId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch certificate")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch certificate"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
