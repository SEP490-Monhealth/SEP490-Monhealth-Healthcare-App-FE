"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { createColumns } from "@/components/locals/admin/reports/columns"
import ReportDetailDialog from "@/components/locals/admin/reports/detail-dialog"

import { ReportStatusEnum } from "@/constants/enum/Report"

import { useDebounce } from "@/hooks/useDebounce"
import { useReports } from "@/hooks/useReport"
import { useUpdateParams } from "@/hooks/useUpdateParams"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  reportId: false,
  createdBy: false,
  updatedBy: false
}

function ReportPage() {
  const searchParams = useSearchParams()
  const { updateParams, clearAllFilters } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const statusParam =
    status && !isNaN(Number(status)) ? Number(status) : undefined

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: reportsData,
    isLoading,
    error
  } = useReports(page, limit, debouncedSearch, statusParam)

  const totalPages = Math.ceil((reportsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "status",
      label: "Trạng thái",
      options: [
        { value: String(ReportStatusEnum.Pending), label: "Chờ xác nhận" },
        { value: String(ReportStatusEnum.Approved), label: "Đã xác nhận" },
        { value: String(ReportStatusEnum.Rejected), label: "Đã từ chối" }
      ],
      value: status !== undefined ? String(status) : "",
      onChange: (value: string) => updateParams("status", value)
    }
  ]

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search, updateParams])

  const handleClearAllFilters = () => {
    clearAllFilters(["status"])
  }

  const handleViewDetail = (bookingId: string) => {
    setSelectedReport(bookingId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedReport(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={reportsData?.reports || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm người dùng hoặc chuyên viên..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={handleClearAllFilters}
      />

      <ReportDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        reportId={selectedReport}
      />
    </div>
  )
}

export default ReportPage
