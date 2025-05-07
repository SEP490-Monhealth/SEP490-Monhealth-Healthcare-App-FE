"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { createColumns } from "@/components/locals/admin/consultants/applications/columns"
import ApplicationDetailDialog from "@/components/locals/admin/consultants/applications/detail-dialog"

import { useConsultants } from "@/hooks/useConsultant"
import { useDebounce } from "@/hooks/useDebounce"
import { useExpertise } from "@/hooks/useExpertise"
import { useUpdateParams } from "@/hooks/useUpdateParams"

import LoadingPage from "../../loading"

const DEFAULT_VISIBILITY = {
  consultantId: false,
  createdBy: false,
  updatedAt: false,
  updatedBy: false
}

function ConsultantApplicationPage() {
  const searchParams = useSearchParams()
  const { updateParams, clearAllFilters } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const expertise = searchParams.get("expertise") || ""
  const search = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(
    null
  )
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: expertiseData,
    isLoading: isExpertiseLoading,
    error: expertiseError
  } = useExpertise(1)

  const {
    data: consultantsData,
    isLoading: isConsultantLoading,
    error: consultantsError
  } = useConsultants(page, limit, expertise, debouncedSearch, false, false)

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
    }
  ]

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search, updateParams])

  const handleClearAllFilters = () => {
    clearAllFilters(["expertise"])
  }

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
  if (expertiseError || consultantsError)
    return <p>Error: {expertiseError?.message || consultantsError?.message}</p>

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
        onClearAllFilters={handleClearAllFilters}
      />

      <ApplicationDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        consultantId={selectedConsultant}
      />
    </div>
  )
}

export default ConsultantApplicationPage
