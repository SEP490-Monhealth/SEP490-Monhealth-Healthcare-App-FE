"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Ban, Circle, Copy, Eye, MoreHorizontal } from "lucide-react"

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
import { Separator } from "@/components/globals/atoms/separator"

import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableTime from "@/components/globals/molecules/data-table-time"

import { WaterReminderType } from "@/schemas/waterReminderSchema"

export type ColumnActionsHandlers = {
  onViewDetail: (waterReminder: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<WaterReminderType>[] => [
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
      <DataTableColumnHeader column={column} title="Thời gian" center />
    ),
    cell: ({ row }) => {
      const time = row.original.time
      return <span className="flex justify-center pr-4">{time}</span>
    }
  },
  {
    accessorKey: "volume",
    meta: { title: "Dung tích" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dung tích (ml)" center />
    ),
    cell: ({ row }) => {
      const volume = row.original.volume
      return <span className="flex justify-center pr-4">{volume}</span>
    }
  },
  {
    accessorKey: "isRecurring",
    meta: { title: "Tần suất" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tần suất" center />
    ),
    cell: ({ row }) => {
      const isRecurring = row.original.isRecurring
      return (
        <span className="flex justify-center pr-4">
          {isRecurring === true ? "Lặp lại hàng ngày" : "Không lặp lại"}
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
      const status = row.original.status
      return (
        <div className="flex justify-center pr-4">
          <Badge variant={status ? "default" : "destructive"}>
            {status ? "Hoạt động" : "Ngừng hoạt động"}
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
      return <DataTableTime time={createdAt} />
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
      return <DataTableTime time={updatedAt} />
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
      const waterReminderData = row.original

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
                    waterReminderData.waterReminderId
                  )
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handlers.onViewDetail(waterReminderData.waterReminderId)
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
