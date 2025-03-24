"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import AddUserDialog from "@/components/locals/admin/users/add-user-dialog"
import UserDetailDialog from "@/components/locals/admin/users/user-detail-dialog"

import { DATA } from "@/constants/data/enumUtils"
import { DifficultyLevelEnum } from "@/constants/enum/Workout"

import { useCategories } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useWorkout } from "@/hooks/useWorkout"

import { CategoryType } from "@/schemas/categorySchema"

import LoadingPage from "../loading"
import { createColumns } from "./columns"

const DEFAULT_VISIBILITY = {
  workoutId: false,
  views: false,
  isPublic: false,
  createdAt: false,
  updatedAt: false,
  createdBy: false,
  updatedBy: false
}

function WorkoutPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const category = searchParams.get("category") || ""

  const search = searchParams.get("search") || ""
  const popular = searchParams.get("popular") || ""
  const status = searchParams.get("status") || ""
  const difficultyParam = searchParams.get("difficulty") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  let difficulty: DifficultyLevelEnum | undefined = undefined

  if (difficultyParam) {
    const difficultyNumber = parseInt(difficultyParam, 10)

    if (
      !isNaN(difficultyNumber) &&
      difficultyNumber >= 0 &&
      difficultyNumber <= 3
    ) {
      difficulty = difficultyNumber as DifficultyLevelEnum
    }
  }

  const parsedStatus =
    status === ""
      ? undefined
      : status === "true"
        ? true
        : status === "false"
          ? false
          : undefined

  const parsedPopular =
    popular === ""
      ? undefined
      : popular === "true"
        ? true
        : popular === "false"
          ? false
          : undefined

  const {
    data: workoutsData,
    isLoading: isWorkoutsLoading,
    error: errorWorkouts
  } = useWorkout(
    page,
    limit,
    category,
    debouncedSearch,
    difficulty,
    parsedPopular,
    parsedStatus
  )

  const {
    data: CategoriesData,
    isLoading: isCategoriesLoading,
    error: errorCategories
  } = useCategories(1, 10, 1, undefined)

  const totalPages = Math.ceil((workoutsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "category",
      label: "Danh mục",
      options:
        CategoriesData?.categories?.map((item: CategoryType) => ({
          value: item.name,
          label: item.name
        })) || [],
      value: category,
      onChange: (value: string) => updateParams("category", value)
    },
    {
      name: "difficulty",
      label: "Độ khó",
      options: DATA.DIFFICULTY_LEVELS.map((item) => ({
        value: String(item.value),
        label: item.label
      })),
      value: difficulty !== undefined ? String(difficulty) : undefined,
      onChange: (value: string) => updateParams("difficulty", value)
    },
    {
      name: "popular",
      label: "Độ phổ biến",
      options: [
        { value: "true", label: "Khá phổ biến" },
        { value: "false", label: "Ít phổ biến" }
      ],
      value: popular,
      onChange: (value: string) => updateParams("popular", value)
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

    params.delete("category")
    params.delete("difficulty")
    params.delete("popular")
    params.delete("status")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
    }
  }, [debouncedSearch])

  const handleViewDetail = (workoutId: string) => {
    setSelectedWorkout(workoutId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedWorkout(null), 300)
  }

  const handleAddWorkout = () => {
    setIsAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false)
    setTimeout(() => setSelectedWorkout(null), 300)
  }

  const columns = createColumns({
    onViewDetail: handleViewDetail
  })

  if (isWorkoutsLoading || isCategoriesLoading) return <LoadingPage />
  if (errorWorkouts) return <p>Error: {errorWorkouts.message}</p>
  if (errorCategories) return <p>Error: {errorCategories.message}</p>

  return (
    <div>
      <DataTable
        data={workoutsData?.workouts || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm bài tập..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={clearAllFilters}
        addNewButton
        onAddNew={handleAddWorkout}
      />

      <UserDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        workoutId={"3b1a8845-765f-4d91-984a-4e8a9d7d376e"}
      />

      <AddUserDialog isOpen={isAddDialogOpen} onClose={handleCloseAddDialog} />
    </div>
  )
}

export default WorkoutPage
