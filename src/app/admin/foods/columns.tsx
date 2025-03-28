"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  BadgeCheck,
  Ban,
  Circle,
  Copy,
  Eye,
  MoreHorizontal
} from "lucide-react"

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

import DataTableCellDescription from "@/components/globals/molecules/data-table-cell-description"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableTime from "@/components/globals/molecules/data-table-time"

import { FoodType } from "@/schemas/foodSchema"

export type ColumnActionsHandlers = {
  onViewDetail: (foodId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<FoodType>[] => [
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
    accessorKey: "foodId",
    meta: { title: "Mã món ăn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã món ăn" />
    )
  },
  {
    accessorKey: "name",
    meta: { title: "Tên món ăn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên món ăn" />
    )
  },
  {
    accessorKey: "category",
    meta: { title: "Danh mục" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Danh mục" />
    )
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
    accessorKey: "nutrition.calories",
    meta: { title: "Năng lượng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Năng lượng (kcal)" center />
    ),
    cell: ({ row }) => {
      const calories = row.original.nutrition.calories
      return <span className="flex justify-center pr-4">{calories}</span>
    }
  },
  {
    accessorKey: "isPublic",
    meta: { title: "Công khai" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Công khai" center />
    ),
    cell: ({ row }) => {
      const isPublic = row.original.isPublic
      return (
        <span className="flex justify-center pr-4">
          {isPublic ? <BadgeCheck fill="#16a34a" color="white" /> : null}
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
      const foodData = row.original
      const isActive = foodData.status

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
                onClick={() => navigator.clipboard.writeText(foodData.foodId)}
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlers.onViewDetail(foodData.foodId)}
              >
                <Eye className="h-4 w-4" />
                Xem chi tiết
              </DropdownMenuItem>

              <Separator />

              <DropdownMenuItem variant={isActive ? "destructive" : "default"}>
                {isActive ? (
                  <>
                    <Ban className="h-4 w-4" />
                    Ngừng hoạt động
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" />
                    Kích hoạt
                  </>
                )}
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
