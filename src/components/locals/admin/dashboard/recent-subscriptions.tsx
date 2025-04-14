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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/globals/atoms/table"

import { useUserSubscriptions } from "@/hooks/useSubscription"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

// const subscriptions = [
//   {
//     userSubscriptionId: "S1",
//     userId: "U1",
//     subscriptionId: "P1",

//     fullName: "John Doe",
//     email: "john.doe@example.com",
//     phoneNumber: "1234567890",
//     avatarUrl: "/placeholder.svg",

//     subscription: "Premium Plan",

//     startedAt: "2023-10-15T09:24:12Z",
//     expiresAt: "2024-10-15T09:24:12Z",
//     remainingBookings: 3,

//     status: 1,

//     createdAt: "2023-10-15T09:24:12Z",
//     updatedAt: "2023-10-15T09:24:12Z"
//   },
//   {
//     userSubscriptionId: "S2",
//     userId: "U2",
//     subscriptionId: "P2",

//     fullName: "Jane Smith",
//     email: "jane.smith@example.com",
//     phoneNumber: "1234567890",
//     avatarUrl: "/placeholder.svg",

//     subscription: "Basic Plan",

//     startedAt: "2023-09-18T14:35:22Z",
//     expiresAt: "2024-09-18T14:35:22Z",
//     remainingBookings: 0,

//     status: 1,

//     createdAt: "2023-10-15T09:24:12Z",
//     updatedAt: "2023-10-15T09:24:12Z"
//   },
//   {
//     userSubscriptionId: "S3",
//     userId: "U3",
//     subscriptionId: "P3",

//     fullName: "Robert Johnson",
//     email: "robert.johnson@example.com",
//     phoneNumber: "1234567890",
//     avatarUrl: "/placeholder.svg",

//     subscription: "Premium Plan",

//     startedAt: "2023-08-20T11:15:45Z",
//     expiresAt: "2024-08-20T11:15:45Z",
//     remainingBookings: 3,

//     status: 1,

//     createdAt: "2023-10-15T09:24:12Z",
//     updatedAt: "2023-10-15T09:24:12Z"
//   },
//   {
//     userSubscriptionId: "S4",
//     userId: "U4",
//     subscriptionId: "P4",

//     fullName: "Emily Davis",
//     email: "emily.davis@example.com",
//     phoneNumber: "1234567890",
//     avatarUrl: "/placeholder.svg",

//     subscription: "Basic Plan",

//     startedAt: "2023-07-22T08:42:18Z",
//     expiresAt: "2023-10-22T08:42:18Z",
//     remainingBookings: 0,

//     status: 0,

//     createdAt: "2023-10-15T09:24:12Z",
//     updatedAt: "2023-10-15T09:24:12Z"
//   },
//   {
//     userSubscriptionId: "S5",
//     userId: "U5",
//     subscriptionId: "P5",

//     fullName: "Michael Wilson",
//     email: "michael.wilson@example.com",
//     phoneNumber: "1234567890",
//     avatarUrl: "/placeholder.svg",

//     subscription: "Premium Plan",

//     startedAt: "2023-10-25T16:08:33Z",
//     expiresAt: "2024-10-25T16:08:33Z",
//     remainingBookings: 3,

//     status: 1,

//     createdAt: "2023-10-15T09:24:12Z",
//     updatedAt: "2023-10-15T09:24:12Z"
//   }
// ]

function RecentSubscriptions() {
  const sortUser = "createdAt"
  const orderUser = "desc"

  const {
    data: userSubscriptionsData,
    isLoading,
    error
  } = useUserSubscriptions(
    1,
    10,
    undefined,
    undefined,
    sortUser,
    orderUser,
    undefined
  )

  if (isLoading) return <LoadingPage />
  if (error) return <p>Error: {error.message}</p>
  if (!userSubscriptionsData) {
    return <p>No data available</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nâng cấp gói gần đây</CardTitle>
        <CardDescription>
          Danh sách người dùng nâng cấp gói gần đây
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Gói đăng ký</TableHead>
              <TableHead>Ngày bắt đầu</TableHead>
              <TableHead>Ngày kết thúc</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userSubscriptionsData.userSubscriptions
              .filter(
                (subscription) =>
                  subscription.subscription.toLowerCase() !== "gói cơ bản"
              )
              .map((subscription) => (
                <TableRow key={subscription.userSubscriptionId}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={subscription.member.avatarUrl}
                          alt={getInitials(subscription.member.fullName)}
                        />
                        <AvatarFallback>
                          {getInitials(subscription.member.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {subscription.member.fullName}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {subscription.member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{subscription.subscription}</TableCell>
                  <TableCell>{formatDate(subscription.startedAt)}</TableCell>
                  <TableCell>{formatDate(subscription.expiresAt)}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        subscription.status === 0 ? "default" : "destructive"
                      }
                    >
                      {subscription.status === 0 ? "Hoạt động" : "Hết hạn"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default RecentSubscriptions
