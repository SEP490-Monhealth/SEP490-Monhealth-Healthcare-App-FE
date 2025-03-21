"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { useDebounce } from "@/hooks/useDebounce"
import { useFoods } from "@/hooks/useFood"

import LoadingPage from "../loading"
import { columns } from "./columns"

const DEFAULT_VISIBILITY = {
  foodId: false,
  description: false,
  createdBy: false,
  updatedBy: false
}

function FoodPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  const handleAddNewFood = () => {
    console.log("halo anh em")
  }

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={foodsData?.foods || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm món ăn..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        addNewButton
        onAddNew={handleAddNewFood}
      />
    </div>
  )
}

export default FoodPage
