"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { createColumns } from "@/components/locals/admin/consultants/banks/columns"
import ConsultantBankDetailDialog from "@/components/locals/admin/consultants/banks/detail-dialog"

import { useConsultantBanks } from "@/hooks/useConsultantBank"
import { useDebounce } from "@/hooks/useDebounce"

import LoadingPage from "../../loading"

const DEFAULT_VISIBILITY = {
  consultantBankId: false,
  createdBy: false,
  updatedBy: false
}

function ConsultantBankPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedConsultantBank, setSelectedConsultantBank] = useState<
    string | null
  >(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: bookingsData,
    isLoading,
    error
  } = useConsultantBanks(page, limit, debouncedSearch)

  const totalPages = Math.ceil((bookingsData?.totalItems || 1) / limit)

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
  }, [debouncedSearch, search, updateParams])

  const handleViewDetail = (consultantBankId: string) => {
    setSelectedConsultantBank(consultantBankId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedConsultantBank(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={bookingsData?.consultantBanks || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm ngân hàng chuyên viên..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        onClearAllFilters={clearAllFilters}
      />

      <ConsultantBankDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        consultantBankId={selectedConsultantBank}
      />
    </div>
  )
}

export default ConsultantBankPage
