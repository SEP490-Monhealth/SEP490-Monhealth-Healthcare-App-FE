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

import { UserType } from "@/schemas/userSchema"

import { formatDateTime, formatPhoneNumber } from "@/utils/formatters"

export const columns: ColumnDef<UserType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
        className="mb-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn dòng"
        className="mb-2"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "userId",
    meta: { title: "Mã người dùng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã người dùng" />
    )
  },
  {
    accessorKey: "fullName",
    header: "Họ tên",
    cell: ({ row }) => {
      const fullName = row.original.fullName
      return <span className="capitalize">{fullName}</span>
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
    cell: ({ row }) => {
      const phoneNumber = row.original.phoneNumber
      return <span>{formatPhoneNumber(phoneNumber)}</span>
    }
  },
  {
    accessorKey: "role",
    header: "Vai trò"
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
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
    header: "Ngày tạo",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      return <span>{formatDateTime(createdAt)}</span>
    }
  },
  {
    accessorKey: "createdBy",
    header: "Người tạo"
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày cập nhật",
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt
      return <span>{formatDateTime(updatedAt)}</span>
    }
  },
  {
    accessorKey: "updatedBy",
    header: "Người cập nhật"
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.userId)}
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
