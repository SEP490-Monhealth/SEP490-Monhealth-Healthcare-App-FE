"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, MoreHorizontal } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/globals/atoms/avatar"
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

import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  getTransactionStatusMeta,
  getTransactionTypeMeta
} from "@/constants/enum/Transaction"

import { TransactionType } from "@/schemas/transactionSchema"

import { formatCurrency, formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

export type ColumnActionsHandlers = {
  onViewDetail: (transactionId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<TransactionType>[] => [
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
    accessorKey: "transactionId",
    meta: { title: "Mã giao dịch" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã giao dịch" />
    )
  },
  {
    accessorKey: "type",
    meta: { title: "Loại giao dịch" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loại giao dịch" center />
    ),
    cell: ({ row }) => {
      const type = row.original.type as TransactionTypeEnum
      const { label, color } = getTransactionTypeMeta(type)

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
    accessorKey: "consultant",
    meta: { title: "Chuyên viên" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chuyên viên" />
    ),
    cell: ({ row }) => {
      const fullName = row.original.consultant.fullName
      const email = row.original.consultant.email
      const avatarUrl = row.original.consultant.avatarUrl

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatarUrl || ""} alt={getInitials(fullName)} />
            <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="capitalize">{fullName}</span>
            <span className="text-muted-foreground text-sm">{email}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "amount",
    meta: { title: "Số tiền" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số tiền (VND)" center />
    ),
    cell: ({ row }) => {
      const amount = row.original.amount
      return (
        <span className="flex justify-center pr-4">
          {formatCurrency(amount)}
        </span>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const description = row.original.description
      return <span className="block max-w-[320px] truncate">{description}</span>
    }
  },
  {
    accessorKey: "status",
    meta: { title: "Trạng thái" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" center />
    ),
    cell: ({ row }) => {
      const status = row.original.status as TransactionStatusEnum
      const { label, color } = getTransactionStatusMeta(status)

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
      return <span>{formatDate(createdAt)}</span>
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
      return <span>{formatDate(updatedAt)}</span>
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
    header: () => (
      <span className="flex items-center justify-center">Thao tác</span>
    ),
    cell: ({ row }) => {
      const transactionData = row.original

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
                  navigator.clipboard.writeText(transactionData.transactionId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handlers.onViewDetail(transactionData.transactionId)
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
