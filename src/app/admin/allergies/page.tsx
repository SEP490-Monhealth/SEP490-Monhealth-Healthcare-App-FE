"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import AddAllergyDialog from "@/components/locals/admin/allergies/add-dialog"
import { createColumns } from "@/components/locals/admin/allergies/columns"
import AllergyDetailDialog from "@/components/locals/admin/allergies/detail-dialog"

import { useAllergies } from "@/hooks/useAllergy"
import { useDebounce } from "@/hooks/useDebounce"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  allergyId: false,
  createdBy: false,
  updatedBy: false
}

function AllergyPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedAllergy, setSelectedAllergy] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const {
    data: allergiesData,
    isLoading,
    error
  } = useAllergies(page, limit, debouncedSearch)

  const totalPages = Math.ceil((allergiesData?.totalItems || 1) / limit)

  const updateParams = (
    key: string,
    value: string | number | boolean | null
  ) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, String(value))
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search])

  const handleViewDetail = (bookingId: string) => {
    setSelectedAllergy(bookingId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedAllergy(null), 300)
  }

  const handleAddAllergy = () => {
    setIsAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false)
    setTimeout(() => setSelectedAllergy(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={allergiesData?.allergies || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm tên dị ứng..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        onClearAllFilters={clearAllFilters}
        addNewButton
        onAddNew={handleAddAllergy}
      />

      <AllergyDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        allergyId={selectedAllergy}
      />

      <AddAllergyDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
      />
    </div>
  )
}

export default AllergyPage
