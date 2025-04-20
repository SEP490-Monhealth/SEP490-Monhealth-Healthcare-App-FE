"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import AddExpertiseDialog from "@/components/locals/admin/consultants/expertise/add-dialog"
import { createColumns } from "@/components/locals/admin/consultants/expertise/columns"
import ExpertiseDetailDialog from "@/components/locals/admin/consultants/expertise/detail-dialog"

import { useDebounce } from "@/hooks/useDebounce"
import { useExpertise } from "@/hooks/useExpertise"
import { useUpdateParams } from "@/hooks/useUpdateParams"

import LoadingPage from "../../loading"

const DEFAULT_VISIBILITY = {
  expertiseId: false,
  email: false,
  createdBy: false,
  updatedBy: false
}

function ExpertisePage() {
  const searchParams = useSearchParams()
  const { updateParams } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(
    null
  )
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const {
    data: expertiseData,
    isLoading,
    error
  } = useExpertise(page, limit, debouncedSearch)

  const totalPages = Math.ceil((expertiseData?.totalItems || 1) / limit)

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search, updateParams])

  const handleViewDetail = (expertiseId: string) => {
    setSelectedExpertise(expertiseId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedExpertise(null), 300)
  }

  const handleAddExpertise = () => {
    setIsAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false)
    setTimeout(() => setSelectedExpertise(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={expertiseData?.expertise || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm chuyên môn..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        addNewButton
        onAddNew={handleAddExpertise}
      />

      <ExpertiseDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        expertiseId={selectedExpertise}
      />

      <AddExpertiseDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
      />
    </div>
  )
}

export default ExpertisePage
