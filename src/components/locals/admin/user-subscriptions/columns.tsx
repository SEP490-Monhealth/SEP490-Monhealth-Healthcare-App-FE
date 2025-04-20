"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/globals/atoms/badge"
import { Button } from "@/components/globals/atoms/button"
import { Checkbox } from "@/components/globals/atoms/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/globals/atoms/dropdown-menu"

import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"
import DataTableCellUser from "@/components/globals/molecules/data-table-user-cell"

import {
  UserSubscriptionStatus,
  getUserSubscriptionStatusMeta
} from "@/constants/enum/UserSubscription"

import { UserSubscriptionType } from "@/schemas/subscriptionSchema"

import { formatDatetime } from "@/utils/formatters"

export type ColumnActionsHandlers = {
  onViewDetail: (userSubscriptionId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<UserSubscriptionType>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mb-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mb-2"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "userSubscriptionId",
    meta: { title: "Mã đăng ký gói" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã đăng ký gói" />
    )
  },
  {
    accessorKey: "member",
    meta: { title: "Người dùng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Người dùng" />
    ),
    cell: ({ row }) => {
      const member = row.original.member
      return <DataTableCellUser user={member} />
    }
  },
  {
    accessorKey: "remainingBookings",
    meta: { title: "Số lần đặt lịch" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lần đặt lịch" center />
    ),
    cell: ({ row }) => {
      const remainingBookings = row.original.remainingBookings
      return (
        <span className="flex justify-center pr-4">{remainingBookings}</span>
      )
    }
  },
  {
    accessorKey: "startedAt",
    meta: { title: "Ngày bắt đầu" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày bắt đầu" center />
    ),
    cell: ({ row }) => {
      const startedAt = row.original.startedAt
      return (
        <span className="flex justify-center pr-4">
          {formatDatetime(startedAt)}
        </span>
      )
    }
  },
  {
    accessorKey: "expiresAt",
    meta: { title: "Ngày hết hạn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày hết hạn" center />
    ),
    cell: ({ row }) => {
      const expiresAt = row.original.expiresAt
      return (
        <span className="flex justify-center pr-4">
          {formatDatetime(expiresAt)}
        </span>
      )
    }
  },
  {
    accessorKey: "status",
    meta: { title: "Trạng thái" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" center />
    ),
    cell: ({ row }) => {
      const status = row.original.status as UserSubscriptionStatus
      const { label, color } = getUserSubscriptionStatusMeta(status)

      return (
        <div className="flex justify-center pr-4">
          <Badge className="text-white" style={{ backgroundColor: color }}>
            {label}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    meta: { title: "Ngày tạo" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      return <DataTableDate date={createdAt} />
    }
  },
  {
    accessorKey: "updatedAt",
    meta: { title: "Ngày cập nhật" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày cập nhật" />
    ),
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt
      return <DataTableDate date={updatedAt} />
    }
  },
  {
    id: "actions",
    header: () => (
      <span className="flex items-center justify-center">Thao tác</span>
    ),
    cell: ({ row }) => {
      const userSubscriptionData = row.original

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    userSubscriptionData.userSubscriptionId
                  )
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handlers.onViewDetail(userSubscriptionData.userSubscriptionId)
                }
              >
                <Eye className="h-4 w-4" />
                Xem chi tiết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
