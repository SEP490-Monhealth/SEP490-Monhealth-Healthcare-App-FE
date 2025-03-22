"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"
import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import AddUserDialog from "@/components/locals/admin/users/add-user-dialog"
import UserDetailDialog from "@/components/locals/admin/users/user-detail-dialog"

import { useDebounce } from "@/hooks/useDebounce"
import { usePortions } from "@/hooks/usePortion"

import LoadingPage from "../../loading"
import { createColumns } from "./columns"

const DEFAULT_VISIBILITY = {
  portionId: false,
  createdBy: false,
  updatedBy: false
}

function UserPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""

  const sort = searchParams.get("sort") || ""
  const order = searchParams.get("order") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedPortion, setSelectedPortion] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const {
    data: portionsData,
    isLoading,
    error
  } = usePortions(page, limit, debouncedSearch, sort, order)

  const totalPages = Math.ceil((portionsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "sort",
      label: "Sắp xếp",
      options: [
        { value: "portionSize", label: "Khẩu phần" },
        { value: "portionWeight", label: "Định lượng" }
      ],
      value: sort,
      onChange: (value: string) => updateParams("sort", value)
    },
    {
      name: "order",
      label: "Thứ tự",
      options: [
        { value: "asc", label: "Giảm dần" },
        { value: "dcs", label: "Tăng dần" }
      ],
      value: order,
      onChange: (value: string) => updateParams("order", value)
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

    params.delete("sort")
    params.delete("order")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
    }
  }, [debouncedSearch])

  const handleViewDetail = (portionId: string) => {
    setSelectedPortion(portionId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedPortion(null), 300)
  }

  const handleAddPortion = () => {
    setIsAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false)
    setTimeout(() => setSelectedPortion(null), 300)
  }

  const columns = createColumns({
    onViewDetail: handleViewDetail
  })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  console.log("ahihi", JSON.stringify(portionsData, null, 2))

  return (
    <div>
      <DataTable
        data={portionsData?.portions || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm tên khẩu phần ăn..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={clearAllFilters}
        addNewButton
        onAddNew={handleAddPortion}
      />

      <UserDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        // userId={selectedPortion}
        userId={"3b1a8845-765f-4d91-984a-4e8a9d7d376e"}
      />

      <AddUserDialog isOpen={isAddDialogOpen} onClose={handleCloseAddDialog} />
    </div>
  )
}

export default UserPage
