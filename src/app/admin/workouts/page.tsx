"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import AddWorkoutDialog from "@/components/locals/admin/workouts/add-workout-dialog"
import WorkoutDetailDialog from "@/components/locals/admin/workouts/workout-detail-dialog"

import { DifficultyLevelEnum } from "@/constants/enum/Workout"

import { useCategories } from "@/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"
import { useWorkout } from "@/hooks/useWorkout"

import { parseBooleanParam } from "@/utils/helpers"

import LoadingPage from "../loading"
import { createColumns } from "./columns"

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const category = searchParams.get("category") || ""

  const search = searchParams.get("search") || ""
  const popular = searchParams.get("popular") || ""
  const difficulty = searchParams.get("difficulty") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const difficultyParam =
    difficulty && !isNaN(Number(difficulty)) ? Number(difficulty) : undefined

  const parsedStatus = parseBooleanParam(status)

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError
  } = useCategories(1, 100, 1, "")

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
    params.delete("status")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
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

  const columns = createColumns({ onViewDetail: handleViewDetail })

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
        onClearAllFilters={clearAllFilters}
        addNewButton
        onAddNew={handleAddWorkout}
      />

      <WorkoutDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        workoutId={selectedWorkout}
      />

      <AddWorkoutDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
      />
    </div>
  )
}

export default WorkoutPage
