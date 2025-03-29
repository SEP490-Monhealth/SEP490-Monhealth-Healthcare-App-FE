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

import DataTableCellDescription from "@/components/globals/molecules/data-table-cell-description"
import DataTableCellUser from "@/components/globals/molecules/data-table-cell-user"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableTime from "@/components/globals/molecules/data-table-time"

import { ScheduleExceptionType } from "@/schemas/scheduleExceptionSchema"

export type ColumnActionsHandlers = {
  onViewDetail: (exceptionId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<ScheduleExceptionType>[] => [
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
    accessorKey: "exceptionId",
    meta: { title: "Mã ngoại lệ" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã ngoại lệ" />
    )
  },
  {
    accessorKey: "consultant",
    meta: { title: "Chuyên viên" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chuyên viên" />
    ),
    cell: ({ row }) => {
      const consultant = row.original.consultant
      return <DataTableCellUser user={consultant} />
    }
  },
  {
    accessorKey: "date",
    meta: { title: "Ngày bận" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày bận" />
    ),
    cell: ({ row }) => {
      const date = row.original.date
      return <DataTableTime time={date} />
    }
  },
  {
    accessorKey: "reason",
    header: "Ghi chú",
    cell: ({ row }) => {
      const reason = row.original.reason
      return reason ? <DataTableCellDescription description={reason} /> : "--"
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
      return <DataTableTime time={createdAt} />
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
      return <DataTableTime time={updatedAt} />
    }
  },
  {
    id: "actions",
    header: () => (
      <span className="flex items-center justify-center">Thao tác</span>
    ),
    cell: ({ row }) => {
      const bookingData = row.original

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
                  navigator.clipboard.writeText(bookingData.exceptionId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlers.onViewDetail(bookingData.exceptionId)}
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
