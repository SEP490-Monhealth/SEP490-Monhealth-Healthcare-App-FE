"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import AddExerciseDialog from "@/components/locals/admin/exercises/add-dialog"
import { createColumns } from "@/components/locals/admin/exercises/columns"
import ExerciseDetailDialog from "@/components/locals/admin/exercises/detail-dialog"

import { ExerciseTypeEnum } from "@/constants/enum/Workout"

import { useDebounce } from "@/hooks/useDebounce"
import { useExerciseStatus, useExercises } from "@/hooks/useExercise"
import { useUpdateParams } from "@/hooks/useUpdateParams"

import { parseBooleanParam } from "@/utils/helpers"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  exerciseId: false,
  createdBy: false,
  updatedBy: false
}

function ExercisePage() {
  const searchParams = useSearchParams()
  const { updateParams, clearAllFilters } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const type = searchParams.get("type") || ""
  const status = searchParams.get("status") || ""

  const typeParam = type && !isNaN(Number(type)) ? Number(type) : undefined

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const parsedStatus = parseBooleanParam(status)

  const { mutate: updateExerciseStatus } = useExerciseStatus()

  const {
    data: exercisesData,
    isLoading,
    error
  } = useExercises(page, limit, typeParam, debouncedSearch, parsedStatus)

  const totalPages = Math.ceil((exercisesData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "type",
      label: "Phân loại",
      options: [
        { value: String(ExerciseTypeEnum.Time), label: "Thời gian" },
        { value: String(ExerciseTypeEnum.Reps), label: "Số lần" }
      ],
      value: type !== undefined ? String(type) : undefined,
      onChange: (value: string) => updateParams("type", value)
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
    clearAllFilters(["type", "status"])
  }

  const handleViewDetail = (bookingId: string) => {
    setSelectedExercise(bookingId)
    setIsDetailDialogOpen(true)
  }

  const handleUpdateStatus = (exerciseId: string) => {
    updateExerciseStatus({ exerciseId })
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedExercise(null), 300)
  }

  const handleAddExercise = () => {
    setIsAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false)
    setTimeout(() => setSelectedExercise(null), 300)
  }

  const columns = createColumns({
    onViewDetail: handleViewDetail,
    onUpdateStatus: handleUpdateStatus
  })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={exercisesData?.exercises || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm tên bài tập..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={handleClearAllFilters}
        addNewButton
        onAddNew={handleAddExercise}
      />

      <ExerciseDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        exerciseId={selectedExercise}
      />

      <AddExerciseDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
      />
    </div>
  )
}

export default ExercisePage
