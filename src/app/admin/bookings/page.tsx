"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import BookingDetailDialog from "@/components/locals/admin/bookings/booking-detail-dialog"

import { BookingStatusEnum } from "@/constants/enum/Booking"

import { useBookings } from "@/hooks/useBooking"
import { useDebounce } from "@/hooks/useDebounce"

import LoadingPage from "../loading"
import { createColumns } from "./columns"

const DEFAULT_VISIBILITY = {
  bookingId: false,
  cancellationReason: false,
  createdBy: false,
  updatedBy: false
}

function BookingPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const statusParam = searchParams.get("status") || ""

  let status: BookingStatusEnum | undefined = undefined

  if (statusParam) {
    const statusNumber = parseInt(statusParam, 10)

    if (!isNaN(statusNumber) && statusNumber >= 0 && statusNumber <= 3) {
      status = statusNumber as BookingStatusEnum
    }
  }

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: bookingsData,
    isLoading,
    error
  } = useBookings(page, limit, debouncedSearch, status)

  const totalPages = Math.ceil((bookingsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "status",
      label: "Trạng thái",
      options: [
        { value: String(BookingStatusEnum.Pending), label: "Chờ xác nhận" },
        { value: String(BookingStatusEnum.Confirmed), label: "Đã xác nhận" },
        { value: String(BookingStatusEnum.Completed), label: "Hoàn thành" },
        { value: String(BookingStatusEnum.Cancelled), label: "Đã hủy" }
      ],
      value: status !== undefined ? String(status) : undefined,
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
    params.delete("status")
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
    }
  }, [debouncedSearch, search])

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
        onClearAllFilters={clearAllFilters}
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
