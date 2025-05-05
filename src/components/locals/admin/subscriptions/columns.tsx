"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/globals/atoms/badge"
import { Checkbox } from "@/components/globals/atoms/checkbox"

import DataTableActionsCell from "@/components/globals/molecules/data-table-action-cell"
import DataTableCellDescription from "@/components/globals/molecules/data-table-description-cell"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"

import { SubscriptionType } from "@/schemas/subscriptionSchema"

import { formatCurrency } from "@/utils/formatters"

export type ColumnActionsHandlers = {
  onViewDetail: (subscriptionId: string) => void
  onUpdateStatus: (subscriptionId: string) => void
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
      <DataTableColumnHeader column={column} title="Mã thức ăn" />
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
      return <DataTableCellDescription description={description} />
    }
  },
  {
    accessorKey: "price",
    meta: { title: "Giá" },
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
    meta: { title: "Thời gian" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian (ngày)" center />
    ),
    cell: ({ row }) => {
      const durationDays = row.original.durationDays
      return <span className="flex justify-center pr-4">{durationDays}</span>
    }
  },
  {
    accessorKey: "features",
    header: "Tính năng",
    cell: ({ row }) => {
      const features = row.original.features
      return <DataTableCellDescription description={features} />
    }
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
      const subscriptionData = row.original

      return (
        <DataTableActionsCell
          id={subscriptionData.subscriptionId}
          isActive={subscriptionData.status}
          onViewDetail={handlers.onViewDetail}
          onUpdateStatus={(subscriptionId) =>
            handlers.onUpdateStatus?.(subscriptionId)
          }
          getConfirmDescription={(isActive) =>
            `Bạn có chắc muốn ${isActive ? "ngừng hoạt động" : "kích hoạt"} gói đăng ký này?`
          }
        />
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
