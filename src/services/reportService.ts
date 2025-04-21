import { toast } from "sonner"

import { ReportStatusEnum } from "@/constants/enum/Report"

import monAPI from "@/lib/monAPI"

import { ReportType } from "@/schemas/reportSchema"

interface ReportsResponse {
  totalPages: number
  totalItems: number
  reports: ReportType[]
}

export const fetchReports = async (
  page: number,
  limit?: number,
  search?: string,
  status?: ReportStatusEnum
): Promise<ReportsResponse> => {
  try {
    const response = await monAPI.get(`/reports`, {
      params: { page, limit, search, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch reports")
    }

    const { totalPages, totalItems, items: reports } = data
    return { totalPages, totalItems, reports }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch reports"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const fetchReportById = async (
  reportId: string
): Promise<ReportType> => {
  try {
    const response = await monAPI.get(`/reports/${reportId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch report")
    }

    return data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch report"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const approveReport = async (
  reportId: string | undefined
): Promise<void> => {
  try {
    const response = await monAPI.patch(`/reports/${reportId}/approved`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to approved report")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to approved report"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}

export const rejectReport = async (
  reportId: string | undefined
): Promise<void> => {
  try {
    const response = await monAPI.patch(`/reports/${reportId}/rejected`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to reject report")
    }

    toast.success(message)
    return message
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to reject report"
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }
}
