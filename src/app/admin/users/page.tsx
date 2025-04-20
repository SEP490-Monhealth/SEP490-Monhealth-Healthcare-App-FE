"use client"

import React, { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { DataTable } from "@/components/globals/atoms/data-table"

import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import AddUserDialog from "@/components/locals/admin/users/add-dialog"
import { createColumns } from "@/components/locals/admin/users/columns"
import UserDetailDialog from "@/components/locals/admin/users/detail-dialog"

import { useDebounce } from "@/hooks/useDebounce"
import { useUpdateParams } from "@/hooks/useUpdateParams"
import { useUserStatus, useUsers } from "@/hooks/useUser"

import { parseBooleanParam } from "@/utils/helpers"

import LoadingPage from "../loading"

const DEFAULT_VISIBILITY = {
  userId: false,
  email: false,
  createdBy: false,
  updatedBy: false
}

function UserPage() {
  const searchParams = useSearchParams()
  const { updateParams, clearAllFilters } = useUpdateParams()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const role = searchParams.get("role") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  const parsedStatus = parseBooleanParam(status)

  const { mutate: updateUserStatus } = useUserStatus()

  const {
    data: usersData,
    isLoading,
    error
  } = useUsers(
    page,
    limit,
    debouncedSearch,
    role,
    undefined,
    undefined,
    parsedStatus
  )

  const totalPages = Math.ceil((usersData?.totalItems || 1) / limit)

  const filters: DataTableFilterProps[] = [
    {
      name: "role",
      label: "Vai trò",
      options: [
        { value: "member", label: "Thành viên" },
        { value: "subscription member", label: "Thành viên trả phí" },
        { value: "admin", label: "Quản trị viên" }
      ],
      value: role,
      onChange: (value: string) => updateParams("role", value)
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
    clearAllFilters(["search", "status", "role"])
  }

  const handleViewDetail = (userId: string) => {
    setSelectedUser(userId)
    setIsDetailDialogOpen(true)
  }

  const handleUpdateStatus = (userId: string) => {
    updateUserStatus({ userId })
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
    setTimeout(() => setSelectedUser(null), 300)
  }

  const handleAddUser = () => {
    setIsAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false)
    setTimeout(() => setSelectedUser(null), 300)
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
        data={usersData?.users || []}
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
        onClearAllFilters={handleClearAllFilters}
        addNewButton
        onAddNew={handleAddUser}
      />

      <UserDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        userId={selectedUser}
      />

      <AddUserDialog isOpen={isAddDialogOpen} onClose={handleCloseAddDialog} />
    </div>
  )
}

export default UserPage
