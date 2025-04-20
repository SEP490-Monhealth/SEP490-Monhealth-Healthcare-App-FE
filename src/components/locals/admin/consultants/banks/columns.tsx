"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/globals/atoms/button"
import { Checkbox } from "@/components/globals/atoms/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/globals/atoms/dropdown-menu"

import DataTableCellBank from "@/components/globals/molecules/data-table-bank-cell"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"

import { ConsultantBankType } from "@/schemas/consultantBankSchema"

export type ColumnActionsHandlers = {
  onViewDetail: (consultantBankId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<ConsultantBankType>[] => [
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
    accessorKey: "consultantBankId",
    meta: { title: "Mã ngân hàng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã ngân hàng" />
    )
  },
  {
    accessorKey: "bank",
    meta: { title: "Ngân hàng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngân hàng" />
    ),
    cell: ({ row }) => {
      const bank = row.original.bank
      return <DataTableCellBank bank={bank} />
    }
  },
  {
    accessorKey: "number",
    meta: { title: "Số tài khoản" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số tài khoản" />
    )
  },
  {
    accessorKey: "name",
    meta: { title: "Tên tài khoản" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên tài khoản" />
    )
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
      const consultantBank = row.original

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
                  navigator.clipboard.writeText(consultantBank.consultantBankId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handlers.onViewDetail(consultantBank.consultantBankId)
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
