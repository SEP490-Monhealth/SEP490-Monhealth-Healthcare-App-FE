"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { createColumns } from "@/components/locals/admin/schedules/exceptions/column"
import ScheduleExceptionDetailDialog from "@/components/locals/admin/schedules/exceptions/detail-dialog"

import { useDebounce } from "@/hooks/useDebounce"
import { useScheduleExceptions } from "@/hooks/useScheduleException"
import { useUpdateParams } from "@/hooks/useUpdateParams"

import LoadingPage from "../../loading"

const DEFAULT_VISIBILITY = {
  scheduleExceptionId: false
}

function ScheduleExceptionPage() {
  const searchParams = useSearchParams()
  const { updateParams } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedException, setSelectedException] = useState<string | null>(
    null
  )
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: scheduleExceptionsData,
    isLoading,
    error
  } = useScheduleExceptions(page, limit, debouncedSearch)

  const totalPages = Math.ceil(
    (scheduleExceptionsData?.totalItems || 1) / limit
  )

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search, updateParams])

  const handleViewDetail = (scheduleExceptionId: string) => {
    setSelectedException(scheduleExceptionId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedException(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={scheduleExceptionsData?.scheduleExceptions || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm lịch nghỉ hoặc chuyên viên..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
      />

      <ScheduleExceptionDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        scheduleExceptionId={selectedException}
      />
    </div>
  )
}

export default ScheduleExceptionPage
