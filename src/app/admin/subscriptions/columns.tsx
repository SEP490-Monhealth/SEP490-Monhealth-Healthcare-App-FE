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
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"

import { useSubscriptionStatus } from "@/hooks/useSubscription"

import { SubscriptionType } from "@/schemas/subscriptionSchema"

import { formatCurrency, formatDate } from "@/utils/formatters"

export type ColumnActionsHandlers = {
  onViewDetail: (subscriptionId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<SubscriptionType>[] => [
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
    accessorKey: "subscriptionId",
    meta: { title: "Mã gói đăng ký" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã món ăn" />
    )
  },
  {
    accessorKey: "name",
    header: "Tên gói đăng ký",
    cell: ({ row }) => {
      const name = row.original.name
      return <span className="capitalize">{name}</span>
    }
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const description = row.original.description
      return (
        <span title={description} className="block max-w-[320px] truncate">
          {description}
        </span>
      )
    }
  },
  {
    accessorKey: "price",
    meta: { title: "Giá (VND)" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá (VND)" center />
    ),
    cell: ({ row }) => {
      const price = row.original.price
      return (
        <span className="flex justify-center pr-4">
          {formatCurrency(price)}
        </span>
      )
    }
  },
  {
    accessorKey: "durationDays",
    meta: { title: "Thời gian (Ngày)" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian (Ngày)" center />
    ),
    cell: ({ row }) => {
      const durationDays = row.original.durationDays
      return <span className="flex justify-center pr-4">{durationDays}</span>
    }
  },
  {
    accessorKey: "features",
    header: "Tính năng"
  },
  {
    accessorKey: "bookingAllowance",
    meta: { title: "Số lần đặt lịch" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lần đặt lịch" center />
    ),
    cell: ({ row }) => {
      const bookingAllowance = row.original.bookingAllowance
      return (
        <span className="flex justify-center pr-4">{bookingAllowance}</span>
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
      const { mutate: updateExerciseStatus } = useSubscriptionStatus()

      const subscriptionData = row.original
      const isActive = subscriptionData.status

      const [openAlert, setOpenAlert] = useState<boolean>(false)

      const handleOpenAlert = (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenAlert(true)
      }

      const handleCloseAlert = () => {
        setOpenAlert(false)
      }

      const handleConfirm = () => {
        updateExerciseStatus({
          subscriptionId: subscriptionData.subscriptionId
        })
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
                  navigator.clipboard.writeText(subscriptionData.subscriptionId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handlers.onViewDetail(subscriptionData.subscriptionId)
                }
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
            } gói đăng kí này?`}
          />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
