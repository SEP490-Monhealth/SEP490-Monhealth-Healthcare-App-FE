"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/globals/atoms/badge"
import { Checkbox } from "@/components/globals/atoms/checkbox"

import DataTableActionsCell from "@/components/globals/molecules/data-table-action-cell"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"
import DataTableCellDescription from "@/components/globals/molecules/data-table-description-cell"

import { FoodType } from "@/schemas/foodSchema"

export type ColumnActionsHandlers = {
  onViewDetail: (foodId: string) => void
  onViewPortion: (foodId: string) => void
  onUpdateStatus: (userId: string) => void
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
    meta: { title: "Mã thức ăn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã thức ăn" />
    )
  },
  {
    accessorKey: "name",
    meta: { title: "Tên thức ăn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên thức ăn" />
    )
  },
  {
    accessorKey: "category",
    meta: { title: "Loại thức ăn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loại thức ăn" />
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
    meta: { title: "Áp dụng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Áp dụng" center />
    ),
    cell: ({ row }) => {
      const isPublic = row.original.isPublic
      return (
        <div className="flex justify-center pr-4">
          <Badge variant="outline">{isPublic ? "Công khai" : "Riêng tư"}</Badge>
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
      const foodData = row.original

      return (
        <DataTableActionsCell
          id={foodData.foodId}
          isActive={foodData.status}
          onViewDetail={handlers.onViewDetail}
          onViewPortion={handlers.onViewPortion}
          onUpdateStatus={(foodId) => handlers.onUpdateStatus?.(foodId)}
          getConfirmDescription={(isActive) =>
            `Bạn có chắc muốn ${isActive ? "ngừng hoạt động" : "kích hoạt"} thức ăn này?`
          }
        />
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
