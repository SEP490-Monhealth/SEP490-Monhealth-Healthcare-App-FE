"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/atoms/badge"
import { Button } from "@/components/atoms/button"
import { Checkbox } from "@/components/atoms/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/atoms/dropdown-menu"
import { DataTableColumnHeader } from "@/components/molecules/data-table-column-header"

import { ConsultantType } from "@/schemas/consultantSchema"

import { formatDateTime, formatPhoneNumber } from "@/utils/formatters"

export const columns: ColumnDef<ConsultantType>[] = [
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
    accessorKey: "consultantId",
    meta: { title: "Mã chuyên viên" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã chuyên viên" />
    )
  },
  {
    accessorKey: "fullName",
    meta: { title: "Họ tên" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Họ tên" />
    ),
    cell: ({ row }) => {
      const fullName = row.original.fullName
      return <span className="capitalize">{fullName}</span>
    }
  },
  {
    accessorKey: "phoneNumber",
    meta: { title: "Số điện thoại" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số điện thoại" />
    ),
    cell: ({ row }) => {
      const phoneNumber = row.original.phoneNumber
      return <span>{formatPhoneNumber(phoneNumber)}</span>
    }
  },
  {
    accessorKey: "bio",
    meta: { title: "Mô tả" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô tả" />
    )
  },
  {
    accessorKey: "experience",
    meta: { title: "Kinh nghiệm (Năm)" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kinh nghiệm (Năm)" />
    )
  },
  {
    accessorKey: "ratingCount",
    meta: { title: "Số đánh giá" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số đánh giá" />
    ),
    cell: ({ row }) => {
      const ratingCount = row.original.ratingCount
      return <span>{ratingCount}</span>
    }
  },
  {
    accessorKey: "averageRating",
    meta: { title: "Đánh giá trung bình" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đánh giá trung bình" />
    ),
    cell: ({ row }) => {
      const averageRating = row.original.averageRating
      return <span>{averageRating.toFixed(1)}</span>
    }
  },
  {
    accessorKey: "isVerified",
    meta: { title: "Đã xác thực" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đã xác thực" />
    ),
    cell: ({ row }) => {
      const isVerified = row.original.isVerified
      return (
        <Badge variant={isVerified ? "default" : "destructive"}>
          {isVerified ? "Đã xác thực" : "Chưa xác thực"}
        </Badge>
      )
    }
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
      const consultantData = row.original

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
                navigator.clipboard.writeText(consultantData.consultantId)
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
