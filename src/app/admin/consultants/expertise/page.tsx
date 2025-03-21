"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import AddExpertiseDialog from "@/components/locals/admin/expertise/add-expertise-dialog"
import ExpertiseDetailDialog from "@/components/locals/admin/expertise/expertise-detail-dialog"

import { useDebounce } from "@/hooks/useDebounce"
import { useExpertise } from "@/hooks/useExpertise"

import LoadingPage from "../../loading"
import { createColumns } from "./colums"

const DEFAULT_VISIBILITY = {
  expertiseId: false,
  email: false,
  createdBy: false,
  updatedBy: false
}

function ExpertisePage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  const columns = createColumns({
    onViewDetail: handleViewDetail
  })

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
