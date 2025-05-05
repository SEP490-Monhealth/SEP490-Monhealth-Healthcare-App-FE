"use client"

import React, { useEffect, useState } from "react"

import { useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import AddFoodDialog from "@/components/locals/admin/foods/add-dialog"
import { createColumns } from "@/components/locals/admin/foods/columns"
import FoodDetailDialog from "@/components/locals/admin/foods/detail-dialog"

import { useAuth } from "@/contexts/AuthContext"

import { useCategories } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useFoodStatus, useFoods } from "@/hooks/useFood"
import { useUpdateParams } from "@/hooks/useUpdateParams"

import { parseBooleanParam } from "@/utils/helpers"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  foodId: false,
  description: false,
  isPublic: false,
  createdBy: false,
  updatedBy: false
}

function FoodPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updateParams, clearAllFilters } = useUpdateParams()

  const { user } = useAuth()
  const userId = user?.userId || ""

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  const isPublic = searchParams.get("isPublic") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedFood, setSelectedFood] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const parsedIsPublic = parseBooleanParam(isPublic)
  const parsedStatus = parseBooleanParam(status)

  const { mutate: updateFoodStatus } = useFoodStatus()

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError
  } = useCategories(1, undefined, 0)

  const {
    data: foodsData,
    isLoading: isFoodsLoading,
    error: foodsError
  } = useFoods(
    page,
    limit,
    category,
    debouncedSearch,
    parsedIsPublic,
    false,
    parsedStatus
  )

  const totalPages = Math.ceil((foodsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "category",
      label: "Danh mục",
      options:
        categoriesData?.categories?.map((item) => ({
          value: item.name,
          label: item.name
        })) || [],
      value: category,
      onChange: (value: string) => updateParams("category", value)
    },
    {
      name: "isPublic",
      label: "Công khai",
      options: [
        { value: "true", label: "Có" },
        { value: "false", label: "Không" }
      ],
      value: isPublic,
      onChange: (value: string) => updateParams("isPublic", value)
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

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search, updateParams])

  const handleClearAllFilters = () => {
    clearAllFilters(["category", "isPublic", "status"])
  }

  const handleViewDetail = (foodId: string) => {
    setSelectedFood(foodId)
    setIsDetailDialogOpen(true)
  }

  const handleUpdateStatus = (foodId: string) => {
    updateFoodStatus({ foodId })
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedFood(null), 300)
  }

  const handleAddFood = () => {
    setIsAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false)
    setTimeout(() => setSelectedFood(null), 300)
  }

  const handleViewPortion = (foodId: string) => {
    router.push(`/admin/foods/${foodId}/portions`)
  }

  const columns = createColumns({
    onViewDetail: handleViewDetail,
    onUpdateStatus: handleUpdateStatus,
    onViewPortion: handleViewPortion
  })

  if (isCategoriesLoading || isFoodsLoading) return <LoadingPage />
  if (categoriesError || foodsError)
    return <p>Error: {categoriesError?.message || foodsError?.message}</p>

  return (
    <div>
      <DataTable
        data={foodsData?.foods || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm thức ăn..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={handleClearAllFilters}
        addNewButton
        onAddNew={handleAddFood}
      />

      <FoodDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        foodId={selectedFood}
      />

      <AddFoodDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        userId={userId}
      />
    </div>
  )
}

export default FoodPage
