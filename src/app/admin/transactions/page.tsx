"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { createColumns } from "@/components/locals/admin/transactions/columns"
import TransactionDetailDialog from "@/components/locals/admin/transactions/detail-dialog"

import {
  TransactionStatusEnum,
  TransactionTypeEnum
} from "@/constants/enum/Transaction"

import { useDebounce } from "@/hooks/useDebounce"
import { useTransactions } from "@/hooks/useTransaction"
import { useUpdateParams } from "@/hooks/useUpdateParams"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  transactionId: false,
  createdBy: false,
  updatedBy: false
}

function TransactionPage() {
  const searchParams = useSearchParams()
  const { updateParams, clearAllFilters } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const type = searchParams.get("type") || ""
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const typeParam = type && !isNaN(Number(type)) ? Number(type) : undefined
  const statusParam =
    status && !isNaN(Number(status)) ? Number(status) : undefined

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(
    null
  )
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: transactionsData,
    isLoading,
    error
  } = useTransactions(page, limit, typeParam, debouncedSearch, statusParam)

  const totalPages = Math.ceil((transactionsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "type",
      label: "Loại giao dịch",
      options: [
        {
          value: String(TransactionTypeEnum.Earning),
          label: "Thu nhập"
        },
        {
          value: String(TransactionTypeEnum.Withdrawal),
          label: "Rút tiền"
        },
        {
          value: String(TransactionTypeEnum.Refund),
          label: "Hoàn tiền"
        },
        {
          value: String(TransactionTypeEnum.Fee),
          label: "Thanh toán"
        },
        {
          value: String(TransactionTypeEnum.Bonus),
          label: "Tiền thưởng"
        }
      ],
      value: type !== undefined ? String(type) : "",
      onChange: (value: string) => updateParams("type", value)
    },
    {
      name: "status",
      label: "Trạng thái",
      options: [
        {
          value: String(TransactionStatusEnum.Pending),
          label: "Đang xử lý"
        },
        {
          value: String(TransactionStatusEnum.Completed),
          label: "Đã thanh toán"
        },
        { value: String(TransactionStatusEnum.Failed), label: "Thất bại" }
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
    clearAllFilters(["type", "status"])
  }

  const handleViewDetail = (transactionId: string) => {
    setSelectedTransaction(transactionId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedTransaction(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={transactionsData?.transactions || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm giao dịch..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={handleClearAllFilters}
      />

      <TransactionDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        transactionId={selectedTransaction}
      />
    </div>
  )
}

export default TransactionPage
