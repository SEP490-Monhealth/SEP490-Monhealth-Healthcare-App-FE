"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import Breadcrumbs from "@/components/globals/molecules/breadcumb"
import { DataTableFilterProps } from "@/components/globals/molecules/data-table-filter"

import { useDebounce } from "@/hooks/useDebounce"
import { useUsers } from "@/hooks/useUser"

import { DataTable } from "../../../components/globals/atoms/data-table"
import LoadingPage from "../loading"
import { columns } from "./columns"

const DEFAULT_VISIBILITY = {
  userId: false,
  createdBy: false,
  updatedBy: false
}

function UserPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const role = searchParams.get("role") || ""
  const status = searchParams.get("status") || ""

  const [searchTerm, setSearchTerm] = useState<string>(search)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const statusForApi =
    status === ""
      ? undefined
      : status === "true"
        ? true
        : status === "false"
          ? false
          : undefined

  const {
    data: usersData,
    isLoading,
    error
  } = useUsers(page, limit, debouncedSearch, role, statusForApi)

  const totalPages = Math.ceil((usersData?.totalItems || 1) / limit)

  const breadcrumbItems = [
    { label: "Bảng điều khiển", href: "#" },
    { label: "Người dùng", href: "#" },
    { label: "Danh sách người dùng", isCurrentPage: true }
  ]

  const filters: DataTableFilterProps[] = [
    {
      name: "role",
      label: "Vai trò",
      options: [
        { value: "user", label: "Người dùng" },
        { value: "moderator", label: "Người kiểm duyệt" },
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

  const updateParams = (
    key: string,
    value: string | number | boolean | null
  ) => {
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

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("role")
    params.delete("status")

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleAddNewUser = () => {
    console.log("halo anh em")
  }

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="space-y-10">
      <Breadcrumbs items={breadcrumbItems} />

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
        onClearAllFilters={clearAllFilters}
        addNewButton
        onAddNew={handleAddNewUser}
      />
    </div>
  )
}

export default UserPage
