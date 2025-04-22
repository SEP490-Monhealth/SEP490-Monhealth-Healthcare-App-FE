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
import DataTableCellDescription from "@/components/globals/molecules/data-table-description-cell"
import DataTableCellUser from "@/components/globals/molecules/data-table-user-cell"

import {
  ScheduleExceptionStatusEnum,
  getScheduleExceptionStatusMeta
} from "@/constants/enum/Schedule"

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
    accessorKey: "scheduleExceptionId",
    meta: { title: "Mã lịch nghỉ" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã lịch nghỉ" />
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
    meta: { title: "Ngày" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày" />
    ),
    cell: ({ row }) => {
      const date = row.original.date
      return <DataTableDate date={date} />
    }
  },
  {
    accessorKey: "reason",
    header: "Lý do",
    cell: ({ row }) => {
      const reason = row.original.reason
      return <DataTableCellDescription description={reason} />
    }
  },
  {
    accessorKey: "status",
    meta: { title: "Trạng thái" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" center />
    ),
    cell: ({ row }) => {
      const status = row.original.status as ScheduleExceptionStatusEnum
      const { label, color } = getScheduleExceptionStatusMeta(status)

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
      return <DataTableDate date={updatedAt} />
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
      const scheduleExceptionData = row.original

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
                    scheduleExceptionData.scheduleExceptionId
                  )
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handlers.onViewDetail(
                    scheduleExceptionData.scheduleExceptionId
                  )
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
