"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useDebounce } from "@/hooks/useDebounce"
import { useFoods } from "@/hooks/useFood"

import { DataTable } from "../../../components/globals/atoms/data-table"
import LoadingPage from "../loading"
import { columns } from "./columns"

const defaultVisibility = {
  foodId: false,
  description: false,
  createdBy: false,
  updatedBy: false
}

function FoodPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = Number(searchParams.get("page")) || 1
  const search = searchParams.get("search") || ""
  const limit = Number(searchParams.get("limit")) || 10

  const [searchTerm, setSearchTerm] = useState(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const {
    data: foodsData,
    isLoading,
    error
  } = useFoods(page, limit, "", debouncedSearch)

  useEffect(() => {
    console.log("Fetching data with limit:", limit)
    console.log("Foods Data:", foodsData)
  }, [foodsData, limit])

  const totalPages = Math.ceil((foodsData?.totalItems || 1) / limit)

  const updateParams = (key: string, value: string | number) => {
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

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <DataTable
      data={foodsData?.foods || []}
      columns={columns}
      visibility={defaultVisibility}
      search={searchTerm}
      setSearch={setSearchTerm}
      placeholder="Tìm kiếm món ăn..."
      page={page}
      setPage={(newPage) => updateParams("page", newPage)}
      totalPages={totalPages}
      limit={limit}
      setLimit={(newLimit) => updateParams("limit", newLimit)}
    />
  )
}

export default FoodPage
