"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import AddCategoryDialog from "@/components/locals/admin/categories/add-dialog"
import { createColumns } from "@/components/locals/admin/categories/columns"
import CategoryDetailDialog from "@/components/locals/admin/categories/detail-dialog"

import { CategoryTypeEnum } from "@/constants/enum/Category"

import { useCategories } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  categoryId: false,
  createdBy: false,
  updatedBy: false
}

function CategoryPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const type = searchParams.get("type") || ""
  const search = searchParams.get("search") || ""

  const typeParam = type && !isNaN(Number(type)) ? Number(type) : undefined

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const {
    data: categoriesData,
    isLoading,
    error
  } = useCategories(page, limit, typeParam, debouncedSearch)

  const totalPages = Math.ceil((categoriesData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "type",
      label: "Phân loại",
      options: [
        { value: String(CategoryTypeEnum.Food), label: "Thực phẩm" },
        { value: String(CategoryTypeEnum.Workout), label: "Luyện tập" }
      ],
      value: type !== undefined ? String(type) : "",
      onChange: (value: string) => updateParams("type", value)
    }
  ]

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

    params.delete("type")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search])

  const handleViewDetail = (bookingId: string) => {
    setSelectedCategory(bookingId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedCategory(null), 300)
  }

  const handleAddCategory = () => {
    setIsAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false)
    setTimeout(() => setSelectedCategory(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={categoriesData?.categories || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm tên danh mục..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={clearAllFilters}
        addNewButton
        onAddNew={handleAddCategory}
      />

      <CategoryDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        categoryId={selectedCategory}
      />

      <AddCategoryDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
      />
    </div>
  )
}

export default CategoryPage
