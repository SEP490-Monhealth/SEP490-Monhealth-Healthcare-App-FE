import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ReportStatusEnum } from "@/constants/enum/Report"

import { ReportType } from "@/schemas/reportSchema"

import {
  approveReport,
  fetchReportByBookingId,
  fetchReportById,
  fetchReports,
  rejectReport
} from "@/services/reportService"

interface ReportsResponse {
  totalPages: number
  totalItems: number
  reports: ReportType[]
}

export const useReports = (
  page: number,
  limit?: number,
  search?: string,
  status?: ReportStatusEnum
) =>
  useQuery<ReportsResponse, Error>({
    queryKey: ["reports", page, limit, search, status],
    queryFn: () => fetchReports(page, limit, search, status),
    staleTime: 1000 * 60 * 5
  })

export const useReportById = (reportId: string) =>
  useQuery<ReportType, Error>({
    queryKey: ["report", reportId],
    queryFn: () => fetchReportById(reportId),
    enabled: !!reportId,
    staleTime: 1000 * 60 * 5
  })

export const useApproveReport = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { reportId: string | undefined }>({
    mutationFn: ({ reportId }) => approveReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] })
      queryClient.invalidateQueries({ queryKey: ["report"] })
    }
  })
}

export const useRejectReport = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { reportId: string | undefined }>({
    mutationFn: ({ reportId }) => rejectReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] })
      queryClient.invalidateQueries({ queryKey: ["report"] })
    }
  })
}

export const useReportByBookingId = (bookingId: string) =>
  useQuery<ReportType[], Error>({
    queryKey: ["report-booking", bookingId],
    queryFn: () => fetchReportByBookingId(bookingId),
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 5
  })
