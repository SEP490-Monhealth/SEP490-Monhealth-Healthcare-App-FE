"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import AddSubscriptionDialog from "@/components/locals/admin/subscriptions/add-dialog"
import { createColumns } from "@/components/locals/admin/subscriptions/columns"
import SubscriptionDetailDialog from "@/components/locals/admin/subscriptions/detail-dialog"

import { useDebounce } from "@/hooks/useDebounce"
import {
  useSubscriptionStatus,
  useSubscriptions
} from "@/hooks/useSubscription"
import { useUpdateParams } from "@/hooks/useUpdateParams"

import { parseBooleanParam } from "@/utils/helpers"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  subscriptionId: false,
  description: false,
  features: false,
  createdBy: false,
  updatedBy: false
}

function SubscriptionPage() {
  const searchParams = useSearchParams()
  const { updateParams, clearAllFilters } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const sort = searchParams.get("sort") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedSubscription, setSelectedSubscription] = useState<
    string | null
  >(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const parsedSort = parseBooleanParam(sort)
  const parsedStatus = parseBooleanParam(status)

  const { mutate: updateSubscriptionStatus } = useSubscriptionStatus()

  const {
    data: subscriptionsData,
    isLoading,
    error
  } = useSubscriptions(page, limit, debouncedSearch, parsedSort, parsedStatus)

  const totalPages = Math.ceil((subscriptionsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "sort",
      label: "Sắp xếp",
      options: [
        { value: "true", label: "Tăng dần" },
        { value: "false", label: "Giảm dần" }
      ],
      value: sort,
      onChange: (value: string) => updateParams("sort", value)
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

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search, updateParams])

  const handleClearAllFilters = () => {
    clearAllFilters(["sort", "status"])
  }

  const handleViewDetail = (subscriptionId: string) => {
    setSelectedSubscription(subscriptionId)
    setIsDetailDialogOpen(true)
  }

  const handleUpdateStatus = (subscriptionId: string) => {
    updateSubscriptionStatus({ subscriptionId })
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedSubscription(null), 300)
  }

  const handleAddSubscription = () => {
    setIsAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false)
    setTimeout(() => setSelectedSubscription(null), 300)
  }

  const columns = createColumns({
    onViewDetail: handleViewDetail,
    onUpdateStatus: handleUpdateStatus
  })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={subscriptionsData?.subscriptions || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm gói đăng ký..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={handleClearAllFilters}
        addNewButton
        onAddNew={handleAddSubscription}
      />

      <SubscriptionDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        subscriptionId={selectedSubscription}
      />

      <AddSubscriptionDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
      />
    </div>
  )
}

export default SubscriptionPage
