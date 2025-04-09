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
import DataTableDate from "@/components/globals/molecules/data-table-date"

import { ReviewType } from "@/schemas/reviewSchema"

export type ColumnActionsHandlers = {
  onViewDetail: (reviewId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<ReviewType>[] => [
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
    accessorKey: "reviewId",
    meta: { title: "Mã đánh giá" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã đánh giá" />
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
    accessorKey: "rating",
    meta: { title: "Đánh giá" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đánh giá" center />
    ),
    cell: ({ row }) => {
      const rating = row.original.rating
      return (
        <div className="flex items-center justify-center pr-4">
          <span>{rating}</span>
          <span className="text-lg">⭐</span>
        </div>
      )
    }
  },
  {
    accessorKey: "comment",
    header: "Phản hồi",
    cell: ({ row }) => {
      const comment = row.original.comment
      return <DataTableCellDescription description={comment} />
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
    accessorKey: "updatedAt",
    meta: { title: "Ngày tạo" },
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
      const reviewData = row.original

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
                  navigator.clipboard.writeText(reviewData.reviewId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlers.onViewDetail(reviewData.reviewId)}
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
