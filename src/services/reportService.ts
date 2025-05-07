import axios from "axios"
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch reports"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch report"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const fetchReportByBookingId = async (
  bookingId: string
): Promise<ReportType[]> => {
  try {
    const response = await monAPI.get(`/reports/booking/${bookingId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw new Error(message || "Failed to fetch report")
    }

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch report"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const approveReport = async (reportId: string): Promise<void> => {
  try {
    const response = await monAPI.patch(`/reports/${reportId}/approve`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to approve report")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to approve report"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}

export const rejectReport = async (reportId: string): Promise<void> => {
  try {
    const response = await monAPI.patch(`/reports/${reportId}/reject`)

    const { success, message } = response.data

    if (!success) {
      throw new Error(message || "Failed to reject report")
    }

    toast.success(message)
    return message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Failed to reject report"
      toast.error(errorMessage)
      throw new Error(errorMessage)
    }

    toast.error("An unknown error occurred")
    throw new Error("An unknown error occurred")
  }
}
