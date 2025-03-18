"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

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
import { DataTableColumnHeader } from "@/components/globals/molecules/data-table-column-header"

import { SubscriptionType } from "@/schemas/subscriptionSchema"

import { formatCurrency, formatDateTime } from "@/utils/formatters"

export const columns: ColumnDef<SubscriptionType>[] = [
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
    accessorKey: "subscriptionId",
    meta: { title: "Mã gói đăng ký" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã món ăn" />
    )
  },
  {
    accessorKey: "name",
    header: "Tên gói đăng ký",
    cell: ({ row }) => {
      const name = row.original.name
      return <span className="capitalize">{name}</span>
    }
  },
  {
    accessorKey: "description",
    header: "Mô tả"
  },
  {
    accessorKey: "price",
    meta: { title: "Giá (VND)" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá (VND)" />
    ),
    cell: ({ row }) => {
      const price = row.original.price
      return <span>{formatCurrency(price)}</span>
    }
  },
  {
    accessorKey: "durationDays",
    meta: { title: "Thời gian (Ngày)" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian (Ngày)" />
    )
  },
  {
    accessorKey: "features",
    header: "Tính năng"
  },
  {
    accessorKey: "bookingAllowance",
    meta: { title: "Số lần đặt lịch" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lần đặt lịch" />
    )
  },
  {
    accessorKey: "status",
    meta: { title: "Trạng thái" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={status ? "default" : "destructive"}>
          {status ? "Hoạt động" : "Ngừng hoạt động"}
        </Badge>
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
      return <span>{formatDateTime(createdAt)}</span>
    }
  },
  {
    accessorKey: "createdBy",
    meta: { title: "Người tạo" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Người tạo" />
    )
  },
  {
    accessorKey: "updatedAt",
    meta: { title: "Ngày cập nhật" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày cập nhật" />
    ),
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt
      return <span>{formatDateTime(updatedAt)}</span>
    }
  },
  {
    accessorKey: "updatedBy",
    meta: { title: "Người cập nhật" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Người cập nhật" />
    )
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => {
      const subscriptionData = row.original

      return (
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
                navigator.clipboard.writeText(subscriptionData.subscriptionId)
              }
            >
              Sao chép mã
            </DropdownMenuItem>
            <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
