"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import AddExerciseDialog from "@/components/locals/admin/exercise/add-exercise-dialog"
import ExerciseDetailDialog from "@/components/locals/admin/exercise/exercise-detail-dialog"

import { ExerciseTypeEnum } from "@/constants/enum/Workout"

import { useDebounce } from "@/hooks/useDebounce"
import { useExercises } from "@/hooks/useExercise"

import LoadingPage from "../loading"
import { createColumns } from "./columns"

const DEFAULT_VISIBILITY = {
  exerciseId: false,
  instructions: false,
  createdBy: false,
  updatedBy: false
}

function ExercisePage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const typeParam = searchParams.get("type") || ""
  const status = searchParams.get("status") || ""

  let type: ExerciseTypeEnum | undefined = undefined

  if (typeParam) {
    const statusNumber = parseInt(typeParam, 10)

    if (!isNaN(statusNumber) && statusNumber >= 0 && statusNumber <= 3) {
      type = statusNumber as ExerciseTypeEnum
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

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const {
    data: exercisesData,
    isLoading,
    error
  } = useExercises(page, limit, type, debouncedSearch, parsedStatus)

  const totalPages = Math.ceil((exercisesData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "type",
      label: "Loại bài tập",
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
    params.delete("status")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
    }
  }, [debouncedSearch, search])

  const handleViewDetail = (bookingId: string) => {
    setSelectedExercise(bookingId)
    setIsDetailDialogOpen(true)
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

  const columns = createColumns({ onViewDetail: handleViewDetail })

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
        onClearAllFilters={clearAllFilters}
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
