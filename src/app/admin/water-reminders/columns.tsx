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

import { WaterReminderType } from "@/schemas/waterReminderSchema"

import { formatDateTime } from "@/utils/formatters"

export type ColumnActionsHandlers = {
  onViewDetails?: (waterReminder: WaterReminderType) => void
}

export const columns: ColumnDef<WaterReminderType>[] = [
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
    accessorKey: "waterReminderId",
    meta: { title: "Mã nhắc nhở" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã nhắc nhở" />
    )
  },
  {
    accessorKey: "name",
    meta: { title: "Tên nhắc nhở" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên nhắc nhở" />
    ),
    cell: ({ row }) => {
      const name = row.original.name
      return <span className="capitalize">{name}</span>
    }
  },
  {
    accessorKey: "time",
    meta: { title: "Thời gian" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian" />
    )
  },
  {
    accessorKey: "volume",
    meta: { title: "Dung tích" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dung tích" />
    )
  },
  {
    accessorKey: "isRecurring",
    meta: { title: "Lặp lại" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lặp lại" />
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
      const userData = row.original

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
                navigator.clipboard.writeText(userData.waterReminderId)
              }
            >
              Sao chép mã
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => handlers.onViewDetails(userData)}>
              Xem chi tiết
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
