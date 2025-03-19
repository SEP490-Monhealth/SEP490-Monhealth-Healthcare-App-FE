"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"
import Breadcrumbs from "@/components/globals/molecules/breadcrumb"
import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { useDebounce } from "@/hooks/useDebounce"
import { useWaterReminders } from "@/hooks/useWaterReminder"

import { WaterReminderType } from "@/schemas/waterReminderSchema"

import LoadingPage from "../loading"
import { columns } from "./columns"

const DEFAULT_VISIBILITY = {
  waterReminderId: false,
  createdBy: false,
  updatedBy: false
}

function WaterReminderPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const recurring = searchParams.get("recurring") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedWaterReminder, setSelectedWaterReminder] =
    useState<WaterReminderType | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const parsedRecurring =
    recurring === ""
      ? undefined
      : status === "true"
        ? true
        : status === "false"
          ? false
          : undefined

  const parsedStatus =
    status === ""
      ? undefined
      : status === "true"
        ? true
        : status === "false"
          ? false
          : undefined

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

  const breadcrumbItems = [
    { label: "Bảng điều khiển", href: "#" },
    { label: "Nhắc nhở", href: "#" },
    { label: "Danh sách nhắc nhở", isCurrentPage: true }
  ]

  const filters: DataTableFilterProps[] = [
    // {
    //   name: "recurring",
    //   label: "",
    //   options: [
    //     { value: "true", label: "" },
    //     { value: "false", label: "" }
    //   ],
    //   value: recurring,
    //   onChange: (value: string) => updateParams("recurring", value)
    // },
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

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
    }
  }, [debouncedSearch])

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("recurring")
    params.delete("status")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleAddNewWaterReminder = () => {
    router.push("/admin/water-reminders/create")
  }

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="space-y-10">
      <Breadcrumbs items={breadcrumbItems} />

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
        addNewButton
        onAddNew={handleAddNewWaterReminder}
      />
    </div>
  )
}

export default WaterReminderPage
