"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { useConsultants } from "@/hooks/useConsultant"
import { useDebounce } from "@/hooks/useDebounce"
import { useExpertise } from "@/hooks/useExpertise"

import LoadingPage from "../../loading"
import { columns } from "./columns"

const DEFAULT_VISIBILITY = {
  consultantId: false,
  createdBy: false,
  updatedAt: false,
  updatedBy: false
}

function ConsultantPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const expertise = searchParams.get("expertise") || ""
  const search = searchParams.get("search") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const {
    data: expertiseData,
    isLoading: isExpertiseLoading,
    error: expertiseError
  } = useExpertise(1, 100, "")

  const {
    data: consultantsData,
    isLoading: isConsultantLoading,
    error: consultantsError
  } = useConsultants(page, limit, expertise, debouncedSearch, false, false)

  const totalPages = Math.ceil((consultantsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "expertise",
      label: "Chuyên môn",
      options:
        expertiseData?.expertise.map((item) => ({
          value: item.expertiseId,
          label: item.name
        })) || [],
      value: expertise,
      onChange: (value: string) => updateParams("expertise", value)
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
      updateParams("page", 1)
    }
  }, [debouncedSearch])

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("expertise")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  if (isExpertiseLoading || isConsultantLoading) return <LoadingPage />
  if (expertiseError || consultantsError)
    return <p>Error: {expertiseError?.message || consultantsError?.message}</p>

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
      />
    </div>
  )
}

export default ConsultantPage
