"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import ReviewDetailDialog from "@/components/locals/admin/reviews/review-detail-dialog"

import { useDebounce } from "@/hooks/useDebounce"
import { useReviews } from "@/hooks/useReview"

import LoadingPage from "../loading"
import { createColumns } from "./columns"

const DEFAULT_VISIBILITY = {
  reviewId: false
}

function ReviewPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const rating = Number(searchParams.get("rating")) || undefined

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedReview, setSelectedReview] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: reviewsData,
    isLoading,
    error
  } = useReviews(page, limit, debouncedSearch, rating)

  const totalPages = Math.ceil((reviewsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "rating",
      label: "Lượt đánh giá",
      options: [
        { value: String(1), label: "(1) ⭐" },
        { value: String(2), label: "(2) ⭐⭐" },
        { value: String(3), label: "(3) ⭐⭐⭐" },
        { value: String(4), label: "(4) ⭐⭐⭐⭐" },
        { value: String(5), label: "(5) ⭐⭐⭐⭐⭐" }
      ],
      value: rating !== undefined ? String(rating) : "",
      onChange: (value: string) => updateParams("rating", value)
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
    params.delete("rating")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search])

  const handleViewDetail = (bookingId: string) => {
    setSelectedReview(bookingId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedReview(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={reviewsData?.reviews || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm đánh giá..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={clearAllFilters}
      />

      <ReviewDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        reviewId={selectedReview}
      />
    </div>
  )
}

export default ReviewPage
