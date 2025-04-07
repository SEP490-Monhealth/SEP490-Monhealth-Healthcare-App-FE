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

import DataTableCellPrice from "@/components/globals/molecules/data-table-cell-price"
import DataTableCellUser from "@/components/globals/molecules/data-table-cell-user"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDateTime from "@/components/globals/molecules/date-table-date-time"

import {
  PaymentStatusEnum,
  getPaymentStatusMeta
} from "@/constants/enum/Payment"

import { PaymentType } from "@/schemas/paymentSchema"

export type ColumnActionsHandlers = {
  onViewDetail: (paymentId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<PaymentType>[] => [
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
    accessorKey: "paymentId",
    meta: { title: "Mã thanh toán" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã thanh toán" />
    )
  },
  {
    accessorKey: "member",
    meta: { title: "Người dùng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Người dùng" />
    ),
    cell: ({ row }) => {
      const member = {
        fullName: row.original.member.fullName,
        email: row.original.member.email,
        avatarUrl: row.original.member.avatarUrl
      }

      return <DataTableCellUser user={member} />
    }
  },
  {
    accessorKey: "subscriptionName",
    meta: { title: "Gói đăng ký" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gói đăng ký" />
    )
  },
  {
    accessorKey: "amount",
    meta: { title: "Số tiền" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số tiền (VND)" center />
    ),
    cell: ({ row }) => {
      const amount = row.original.amount
      return <DataTableCellPrice amount={amount} />
    }
  },
  {
    accessorKey: "status",
    meta: { title: "Trạng thái" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" center />
    ),
    cell: ({ row }) => {
      const status = row.original.status as PaymentStatusEnum
      const { label, color } = getPaymentStatusMeta(status)

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
      return <DataTableDateTime datetime={createdAt} />
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
      return <DataTableDateTime datetime={updatedAt} />
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
      const paymentData = row.original

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
                  navigator.clipboard.writeText(paymentData.paymentId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlers.onViewDetail(paymentData.paymentId)}
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
