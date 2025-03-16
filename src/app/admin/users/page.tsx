"use client"

import React, { useState } from "react"

import { useUsers } from "@/hooks/useUser"

import LoadingPage from "../loading"
import { columns } from "./columns"
import { DataTable } from "./data-table"

function UserPage() {
  // const data = sampleUserData

  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")

  const limit = 10

  const { data, isLoading, error } = useUsers(page, limit, search)

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="">
      <DataTable columns={columns} data={data?.users || []} />
    </div>
  )
}

export default UserPage
