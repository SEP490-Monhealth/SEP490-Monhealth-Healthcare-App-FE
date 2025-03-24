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

import { getBookingStatusMeta } from "@/constants/enum/Booking"

import { BookingType } from "@/schemas/bookingSchema"

import { formatDate, formatDateTime } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

export type ColumnActionsHandlers = {
  onViewDetail: (bookingId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<BookingType>[] => [
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
    accessorKey: "bookingId",
    meta: { title: "Mã lịch hẹn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã lịch hẹn" />
    )
  },
  {
    accessorKey: "memberName",
    meta: { title: "Người dùng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Người dùng" />
    ),
    cell: ({ row }) => {
      const memberName = row.original.memberName
      const avatarUrl = row.original.memberAvatar

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatarUrl || ""} alt={getInitials(memberName)} />
            <AvatarFallback>{getInitials(memberName)}</AvatarFallback>
          </Avatar>

          <span className="capitalize">{memberName}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "consultantName",
    meta: { title: "Chuyên viên" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chuyên viên" />
    ),
    cell: ({ row }) => {
      const consultantName = row.original.consultantName
      const avatarUrl = row.original.consultantAvatar

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={avatarUrl || ""}
              alt={getInitials(consultantName)}
            />
            <AvatarFallback>{getInitials(consultantName)}</AvatarFallback>
          </Avatar>

          <span className="capitalize">{consultantName}</span>
        </div>
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
      const { label, color } = getBookingStatusMeta(status)

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
    accessorKey: "date",
    meta: { title: "Lịch hẹn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lịch hẹn" />
    ),
    cell: ({ row }) => {
      const date = row.original.date
      return <span>{formatDateTime(date)}</span>
    }
  },
  {
    accessorKey: "notes",
    header: "Ghi chú",
    cell: ({ row }) => {
      const notes = row.original.notes
      return (
        <span className="block max-w-[320px] truncate">
          {notes ? notes : "--"}
        </span>
      )
    }
  },
  {
    accessorKey: "cancellationReason",
    header: "Lý do hủy",
    cell: ({ row }) => {
      const cancellationReason = row.original.cancellationReason
      return (
        <span className="block max-w-[320px] truncate">
          {cancellationReason ? cancellationReason : "--"}
        </span>
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
                  navigator.clipboard.writeText(bookingData.bookingId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlers.onViewDetail(bookingData.bookingId)}
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
