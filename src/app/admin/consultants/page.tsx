"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import ConsultantDetailDialog from "@/components/locals/admin/consultants/detail-dialog"

import { useConsultants } from "@/hooks/useConsultant"
import { useDebounce } from "@/hooks/useDebounce"
import { useExpertise } from "@/hooks/useExpertise"

import { parseBooleanParam } from "@/utils/helpers"

import LoadingPage from "../loading"
import { createColumns } from "./columns"

const DEFAULT_VISIBILITY = {
  consultantId: false,
  bio: false,
  bookingCount: false,
  ratingCount: false,
  averageRating: false,
  createdBy: false,
  updatedBy: false
}

function ConsultantPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const expertise = searchParams.get("expertise") || ""
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(
    null
  )
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const parsedStatus = parseBooleanParam(status)

  const {
    data: expertiseData,
    isLoading: isExpertiseLoading,
    error: expertiseError
  } = useExpertise(1)

  const {
    data: consultantsData,
    isLoading: isConsultantLoading,
    error: consultantError
  } = useConsultants(
    page,
    limit,
    expertise,
    debouncedSearch,
    true,
    parsedStatus
  )

  const totalPages = Math.ceil((consultantsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "expertise",
      label: "Chuyên môn",
      options:
        expertiseData?.expertise.map((item) => ({
          value: item.expertiseId,
          label: item.name
        })) || [],
      value: expertise,
      onChange: (value: string) => updateParams("expertise", value)
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

    params.delete("expertise")
    params.delete("status")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch])

  const handleViewDetail = (consultantId: string) => {
    setSelectedConsultant(consultantId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedConsultant(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isExpertiseLoading || isConsultantLoading) return <LoadingPage />
  if (expertiseError || consultantError)
    return <p>Error: {expertiseError?.message || consultantError?.message}</p>

  return (
    <div>
      <DataTable
        data={consultantsData?.consultants || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm chuyên viên tư vấn..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={clearAllFilters}
      />

      <ConsultantDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        consultantId={selectedConsultant}
      />
    </div>
  )
}

export default ConsultantPage
