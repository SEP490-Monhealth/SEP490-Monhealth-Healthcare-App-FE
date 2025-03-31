"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import UserSubscriptionDetailDialog from "@/components/locals/admin/user-subscription/detail-dialog"

import { UserSubscriptionStatus } from "@/constants/enum/UserSubscription"

import { useDebounce } from "@/hooks/useDebounce"
import { useUserSubscriptions } from "@/hooks/useSubscription"

import LoadingPage from "../loading"
import { createColumns } from "./columns"

const DEFAULT_VISIBILITY = {
  userSubscriptionId: false,
  createdAt: false,
  updatedAt: false
}

function UserSubscriptionPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const subscription = searchParams.get("subscription") || ""
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const statusParam =
    status && !isNaN(Number(status)) ? Number(status) : undefined

  const [searchTerm, setSearchTerm] = useState<string>(subscription)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedUserSubscription, setSelectedUserSubscription] = useState<
    string | null
  >(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)

  const {
    data: userSubscriptionsData,
    isLoading,
    error
  } = useUserSubscriptions(
    page,
    limit,
    subscription,
    debouncedSearch,
    statusParam
  )

  const totalPages = Math.ceil((userSubscriptionsData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "subscription",
      label: "Gói đăng ký",
      options: [
        {
          value: "Gói Nâng Cao",
          label: "Gói Nâng Cao"
        },
        {
          value: "Gói Cao Cấp",
          label: "Gói Cao Cấp"
        }
      ],
      value: subscription !== undefined ? String(subscription) : "",
      onChange: (value: string) => updateParams("subscription", value)
    },
    {
      name: "status",
      label: "Trạng thái",
      options: [
        {
          value: String(UserSubscriptionStatus.Active),
          label: "Đang hoạt động"
        },
        {
          value: String(UserSubscriptionStatus.Expired),
          label: "Hết hạn"
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

    params.delete("subscription")
    params.delete("status")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams("search", debouncedSearch)
      updateParams("page", 1)
    }
  }, [debouncedSearch, search])

  const handleViewDetail = (userSubscriptionId: string) => {
    setSelectedUserSubscription(userSubscriptionId)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedUserSubscription(null), 300)
  }

  const columns = createColumns({ onViewDetail: handleViewDetail })

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <DataTable
        data={userSubscriptionsData?.userSubscriptions || []}
        columns={columns}
        visibility={DEFAULT_VISIBILITY}
        search={searchTerm}
        setSearch={setSearchTerm}
        placeholder="Tìm kiếm người dùng..."
        page={page}
        setPage={(newPage) => updateParams("page", newPage)}
        totalPages={totalPages}
        limit={limit}
        setLimit={(newLimit) => updateParams("limit", newLimit)}
        filters={filters}
        onClearAllFilters={clearAllFilters}
      />

      <UserSubscriptionDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        userSubscriptionId={selectedUserSubscription}
      />
    </div>
  )
}

export default UserSubscriptionPage
