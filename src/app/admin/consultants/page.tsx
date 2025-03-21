"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"
import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { useConsultants } from "@/hooks/useConsultant"
import { useDebounce } from "@/hooks/useDebounce"

import LoadingPage from "../loading"
import { columns } from "./columns"

const DEFAULT_VISIBILITY = {
  consultantId: false,
  bio: false,
  createdBy: false,
  updatedBy: false
}

function ConsultantPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const parsedStatus =
    status === ""
      ? undefined
      : status === "true"
        ? true
        : status === "false"
          ? false
          : undefined

  const {
    data: consultantsData,
    isLoading,
    error
  } = useConsultants(page, limit, debouncedSearch, parsedStatus)

  const totalPages = Math.ceil((consultantsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
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

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
    }
  }, [debouncedSearch])

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("status")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleAddNewConsultant = () => {
    router.push("/admin/consultants/create")
  }

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={consultantsData?.consultants || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm chuyên viên tư vấn..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={clearAllFilters}
        addNewButton
        onAddNew={handleAddNewConsultant}
      />
    </div>
  )
}

export default ConsultantPage
