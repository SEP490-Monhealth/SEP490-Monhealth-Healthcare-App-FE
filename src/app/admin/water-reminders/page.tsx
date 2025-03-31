"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { createColumns } from "@/components/locals/admin/water-reminders/columns"
import WaterReminderDetailDialog from "@/components/locals/admin/water-reminders/detail-dialog"

import { useDebounce } from "@/hooks/useDebounce"
import { useWaterReminders } from "@/hooks/useWaterReminder"

import { parseBooleanParam } from "@/utils/helpers"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  waterReminderId: false,
  createdBy: false,
  updatedBy: false
}

function WaterReminderPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const recurring = searchParams.get("recurring") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedWaterReminder, setSelectedWaterReminder] = useState<
    string | null
  >(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const parsedRecurring = parseBooleanParam(recurring)
  const parsedStatus = parseBooleanParam(status)

  const {
    data: waterRemindersData,
    isLoading,
    error
  } = useWaterReminders(
    page,
    limit,
    debouncedSearch,
    parsedRecurring,
    parsedStatus
  )

  const totalPages = Math.ceil((waterRemindersData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "recurring",
      label: "Tần suất lặp lại",
      options: [
        { value: "true", label: "Lặp lại hàng ngày" },
        { value: "false", label: "Không lặp lại" }
      ],
      value: recurring,
      onChange: (value: string) => updateParams("recurring", value)
    },
    {
      name: "status",
      label: "Trạng thái",
      options: [
        { value: "true", label: "Hoạt động" },
        { value: "false", label: "Ngừng hoạt động" }
      ],
      value: status,
      onChange: (value: string) => updateParams("status", value)
    }
  ]

  const updateParams = (
    key: string,
    value: string | number | boolean | null
  ) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, String(value))
    } else {
      params.delete(key)
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("recurring")
    params.delete("status")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch])

  const handleViewDetail = (waterReminderId: string) => {
    setSelectedWaterReminder(waterReminderId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedWaterReminder(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={waterRemindersData?.waterReminders || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm tên nhắc nhở..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={clearAllFilters}
      />

      <WaterReminderDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        waterReminderId={selectedWaterReminder}
      />
    </div>
  )
}

export default WaterReminderPage
