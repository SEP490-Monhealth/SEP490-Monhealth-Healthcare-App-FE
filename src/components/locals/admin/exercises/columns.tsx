"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/globals/atoms/badge"
import { Checkbox } from "@/components/globals/atoms/checkbox"

import DataTableActionsCell from "@/components/globals/molecules/data-table-action-cell"
import DataTableCellDescription from "@/components/globals/molecules/data-table-cell-description"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"

import { ExerciseType } from "@/schemas/exerciseSchema"

export type ColumnActionsHandlers = {
  onViewDetail: (exerciseId: string) => void
  onUpdateStatus: (exerciseId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<ExerciseType>[] => [
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
    accessorKey: "exerciseId",
    meta: { title: "Mã bài tập" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã bài tập" />
    )
  },
  {
    accessorKey: "name",
    meta: { title: "Tên bài tập" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên bài tập" />
    )
  },
  {
    accessorKey: "instructions",
    header: "Hướng dẫn",
    cell: ({ row }) => {
      const instructions = row.original.instructions
      return <DataTableCellDescription description={instructions} />
    }
  },
  {
    accessorKey: "caloriesPerMinute",
    meta: { title: "Năng lượng đốt" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Năng lượng đốt (kcal/phút)"
        center
      />
    ),
    cell: ({ row }) => {
      const caloriesPerMinute = row.original.caloriesPerMinute
      return (
        <span className="flex justify-center pr-4">{caloriesPerMinute}</span>
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
      const exerciseData = row.original

      return (
        <DataTableActionsCell
          id={exerciseData.exerciseId}
          isActive={exerciseData.status}
          onViewDetail={handlers.onViewDetail}
          onUpdateStatus={(exerciseId) => handlers.onUpdateStatus?.(exerciseId)}
          getConfirmDescription={(isActive) =>
            `Bạn có chắc muốn ${isActive ? "ngừng hoạt động" : "kích hoạt"} bài tập này?`
          }
        />
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
