"use client"

import { useState } from "react"

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

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
import DataTableCellDescription from "@/components/globals/molecules/data-table-cell-description"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"

import { useExerciseStatus } from "@/hooks/useExercise"

import { ExerciseType } from "@/schemas/exerciseSchema"

export type ColumnActionsHandlers = {
  onViewDetail: (exerciseId: string) => void
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
      const { mutate: updateExerciseStatus } = useExerciseStatus()

      const exerciseData = row.original
      const isActive = exerciseData.status

      const [openAlert, setOpenAlert] = useState<boolean>(false)

      const handleOpenAlert = (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenAlert(true)
      }

      const handleCloseAlert = () => {
        setOpenAlert(false)
      }

      const handleConfirm = () => {
        updateExerciseStatus({ exerciseId: exerciseData.exerciseId })
        setOpenAlert(false)
      }

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
                  navigator.clipboard.writeText(exerciseData.exerciseId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlers.onViewDetail(exerciseData.exerciseId)}
              >
                <Eye className="h-4 w-4" />
                Xem chi tiết
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                variant={isActive ? "destructive" : "default"}
                onClick={handleOpenAlert}
              >
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

          <ConfirmAlertDialog
            open={openAlert}
            onOpenChange={handleCloseAlert}
            onConfirm={handleConfirm}
            title="Xác nhận thay đổi trạng thái"
            description={`Bạn có chắc muốn ${
              isActive ? "ngừng hoạt động" : "kích hoạt"
            } bài tập này?`}
          />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
