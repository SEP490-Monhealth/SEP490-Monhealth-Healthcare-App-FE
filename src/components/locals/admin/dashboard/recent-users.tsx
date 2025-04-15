"use client"

import React from "react"

import LoadingPage from "@/app/admin/loading"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/globals/atoms/avatar"
import { Badge } from "@/components/globals/atoms/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/globals/atoms/card"

import { useUsers } from "@/hooks/useUser"

import { getInitials } from "@/utils/helpers"

// const users = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     role: "Member",
//     status: true,
//     createdAt: "2023-10-15T09:24:12Z",
//     avatarUrl: "/placeholder.svg"
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     role: "Member",
//     status: true,
//     createdAt: "2023-10-18T14:35:22Z",
//     avatarUrl: "/placeholder.svg"
//   },
//   {
//     id: "3",
//     name: "Robert Johnson",
//     email: "robert.johnson@example.com",
//     role: "Consultant",
//     status: true,
//     createdAt: "2023-10-20T11:15:45Z",
//     avatarUrl: "/placeholder.svg"
//   },
//   {
//     id: "4",
//     name: "Emily Davis",
//     email: "emily.davis@example.com",
//     role: "Member",
//     status: false,
//     createdAt: "2023-10-22T08:42:18Z",
//     avatarUrl: "/placeholder.svg"
//   },
//   {
//     id: "5",
//     name: "Michael Wilson",
//     email: "michael.wilson@example.com",
//     role: "Member",
//     status: true,
//     createdAt: "2023-10-25T16:08:33Z",
//     avatarUrl: "/placeholder.svg"
//   }
// ]

function RecentUsers() {
  const sortUser = "createdAt"
  const orderUser = "desc"

  const {
    data: usersData,
    isLoading,
    error
  } = useUsers(1, 9, undefined, undefined, sortUser, orderUser, undefined)

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>
  if (!usersData) {
    return <p>No data available</p>
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Người dùng mới</CardTitle>
        <CardDescription>Người dùng đăng ký gần đây</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          {usersData.users
            .filter((user) => user.role.toLowerCase() !== "admin")
            .map((user) => (
              <div key={user.userId} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.avatarUrl}
                    alt={getInitials(user.fullName)}
                  />
                  <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm leading-none font-medium">
                    {user.fullName}
                  </p>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentUsers
