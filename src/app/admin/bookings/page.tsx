"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { createColumns } from "@/components/locals/admin/bookings/columns"
import BookingDetailDialog from "@/components/locals/admin/bookings/detail-dialog"

import { BookingStatusEnum } from "@/constants/enum/Booking"

import { useBookings } from "@/hooks/useBooking"
import { useDebounce } from "@/hooks/useDebounce"
import { useUpdateParams } from "@/hooks/useUpdateParams"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  bookingId: false,
  cancellationReason: false,
  createdBy: false,
  updatedAt: false,
  updatedBy: false
}

function BookingPage() {
  const searchParams = useSearchParams()
  const { updateParams, clearAllFilters } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const statusParam =
    status && !isNaN(Number(status)) ? Number(status) : undefined

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: bookingsData,
    isLoading,
    error
  } = useBookings(page, limit, debouncedSearch, statusParam)

  const totalPages = Math.ceil((bookingsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "status",
      label: "Trạng thái",
      options: [
        { value: String(BookingStatusEnum.Booked), label: "Đã đặt" },
        { value: String(BookingStatusEnum.Completed), label: "Đã hoàn thành" },
        { value: String(BookingStatusEnum.Cancelled), label: "Đã hủy" }
      ],
      value: status !== undefined ? String(status) : "",
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
    clearAllFilters(["status"])
  }

  const handleViewDetail = (bookingId: string) => {
    setSelectedBooking(bookingId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedBooking(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={bookingsData?.bookings || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm người dùng hoặc chuyên viên..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={handleClearAllFilters}
      />

      <BookingDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        bookingId={selectedBooking}
      />
    </div>
  )
}

export default BookingPage
