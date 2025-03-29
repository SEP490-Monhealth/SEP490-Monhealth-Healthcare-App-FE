"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import TransactionWithdrawalDetailDialog from "@/components/locals/admin/withdrawal-requests/withdrawal-requests-detail-dialog"

import { WithdrawalRequestStatusEnum } from "@/constants/enum/WithdrawalRequest"

import { useDebounce } from "@/hooks/useDebounce"
import { useTransactions } from "@/hooks/useTransaction"
import { useWithdrawalRequests } from "@/hooks/useWithdrawalRequest"

import LoadingPage from "../loading"
import { createColumns } from "./column"

const DEFAULT_VISIBILITY = {
  transactionId: false,
  createdBy: false,
  updatedBy: false
}

function WithdrawalRequestPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const typeParam =
    status && !isNaN(Number(status)) ? Number(status) : undefined

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedWithdrawalRequest, setSelectedWithdrawalRequest] = useState<
    string | null
  >(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: withdrawalRequestsData,
    isLoading,
    error
  } = useWithdrawalRequests(page, limit, debouncedSearch, typeParam)

  const totalPages = Math.ceil(
    (withdrawalRequestsData?.totalItems || 1) / limit
  )

  const filters: DataTableFilterProps[] = [
    {
      name: "status",
      label: "Trạng thái",
      options: [
        {
          value: String(WithdrawalRequestStatusEnum.Pending),
          label: "Chờ xử lý"
        },
        {
          value: String(WithdrawalRequestStatusEnum.Approved),
          label: "Đã thanh toán"
        },
        {
          value: String(WithdrawalRequestStatusEnum.Completed),
          label: "Hoàn tất"
        },
        {
          value: String(WithdrawalRequestStatusEnum.Rejected),
          label: "Hoàn trả"
        }
      ],
      value: status !== undefined ? String(status) : "",
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
      updateParams("page", 1)
    }
  }, [debouncedSearch, search])

  const handleViewDetail = (transactionId: string) => {
    setSelectedWithdrawalRequest(transactionId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedWithdrawalRequest(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={withdrawalRequestsData?.withdrawalRequests || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm yêu cầu..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={clearAllFilters}
      />

      <TransactionWithdrawalDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        withdrawalRequestId={selectedWithdrawalRequest}
      />
    </div>
  )
}

export default WithdrawalRequestPage
