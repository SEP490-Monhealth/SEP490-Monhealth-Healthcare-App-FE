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

import DataTableCellDescription from "@/components/globals/molecules/data-table-description-cell"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"

import { getCategoryMeta } from "@/constants/enum/Category"

import { CategoryType } from "@/schemas/categorySchema"

export type ColumnActionsHandlers = {
  onViewDetail: (categoryId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<CategoryType>[] => [
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
    accessorKey: "categoryId",
    meta: { title: "Mã danh mục" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã danh mục" />
    )
  },
  {
    accessorKey: "name",
    meta: { title: "Tên danh mục" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên danh mục" />
    )
  },
  {
    accessorKey: "type",
    meta: { title: "Phân loại" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phân loại" />
    ),
    cell: ({ row }) => {
      const type = row.original.type
      const { label } = getCategoryMeta(type)

      return <span>{label}</span>
    }
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const description = row.original.description
      return <DataTableCellDescription description={description} />
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
      const categoryData = row.original

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
                  navigator.clipboard.writeText(categoryData.categoryId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlers.onViewDetail(categoryData.categoryId)}
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
