"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { createColumns } from "@/components/locals/admin/workouts/columns"
import WorkoutDetailDialog from "@/components/locals/admin/workouts/detail-dialog"

import { DifficultyLevelEnum } from "@/constants/enum/Workout"

import { useCategories } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useUpdateParams } from "@/hooks/useUpdateParams"
import { useWorkout, useWorkoutStatus } from "@/hooks/useWorkout"

import { parseBooleanParam } from "@/utils/helpers"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  workoutId: false,
  description: false,
  durationMinutes: false,
  caloriesBurned: false,
  isPublic: false,
  createdBy: false,
  updatedBy: false
}

function WorkoutPage() {
  const searchParams = useSearchParams()
  const { updateParams, clearAllFilters } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const category = searchParams.get("category") || ""

  const search = searchParams.get("search") || ""
  const difficulty = searchParams.get("difficulty") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const difficultyParam =
    difficulty && !isNaN(Number(difficulty)) ? Number(difficulty) : undefined

  const parsedStatus = parseBooleanParam(status)

  const { mutate: updateWorkoutStatus } = useWorkoutStatus()

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError
  } = useCategories(1, undefined, 1)

  const {
    data: workoutsData,
    isLoading: isWorkoutsLoading,
    error: workoutsError
  } = useWorkout(
    page,
    limit,
    category,
    debouncedSearch,
    difficultyParam,
    false,
    parsedStatus
  )

  const totalPages = Math.ceil((workoutsData?.totalItems || 1) / limit)

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
      name: "difficulty",
      label: "Độ khó",
      options: [
        { value: String(DifficultyLevelEnum.Easy), label: "Mức dễ" },
        { value: String(DifficultyLevelEnum.Medium), label: "Mức trung bình" },
        { value: String(DifficultyLevelEnum.Hard), label: "Mức khó" }
      ],
      value: difficulty !== undefined ? String(difficulty) : undefined,
      onChange: (value: string) => updateParams("difficulty", value)
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
    clearAllFilters(["category", "difficulty", "status"])
  }

  const handleViewDetail = (workoutId: string) => {
    setSelectedWorkout(workoutId)
    setIsDetailDialogOpen(true)
  }

  const handleUpdateStatus = (workoutId: string) => {
    updateWorkoutStatus({ workoutId })
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedWorkout(null), 300)
  }

  const columns = createColumns({
    onViewDetail: handleViewDetail,
    onUpdateStatus: handleUpdateStatus
  })

  if (isCategoriesLoading || isWorkoutsLoading) return <LoadingPage />
  if (categoriesError || workoutsError)
    return <p>Error: {categoriesError?.message || workoutsError?.message}</p>

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
        onClearAllFilters={handleClearAllFilters}
      />

      <WorkoutDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        workoutId={selectedWorkout}
      />
    </div>
  )
}

export default WorkoutPage
