"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/globals/atoms/badge"
import { Checkbox } from "@/components/globals/atoms/checkbox"

import DataTableActionsCell from "@/components/globals/molecules/data-table-action-cell"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"
import DataTableCellDescription from "@/components/globals/molecules/data-table-description-cell"
import DataTableCellUser from "@/components/globals/molecules/data-table-user-cell"

import { ConsultantType } from "@/schemas/consultantSchema"

import { formatPhoneNumber } from "@/utils/formatters"

export type ColumnActionsHandlers = {
  onViewDetail: (consultantId: string) => void
  onUpdateStatus: (consultantId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<ConsultantType>[] => [
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
    accessorKey: "consultantId",
    meta: { title: "Mã chuyên viên" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã chuyên viên" />
    )
  },
  {
    accessorKey: "fullName",
    meta: { title: "Họ tên" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Họ tên" />
    ),
    cell: ({ row }) => {
      const consultant = {
        fullName: row.original.fullName,
        email: row.original.email,
        avatarUrl: row.original.avatarUrl
      }

      return <DataTableCellUser user={consultant} />
    }
  },
  {
    accessorKey: "phoneNumber",
    meta: { title: "Số điện thoại" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số điện thoại" />
    ),
    cell: ({ row }) => {
      const phoneNumber = row.original.phoneNumber
      return <span>{formatPhoneNumber(phoneNumber)}</span>
    }
  },
  {
    accessorKey: "expertise",
    meta: { title: "Chuyên môn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chuyên môn" />
    )
  },
  {
    accessorKey: "bio",
    meta: { title: "Mô tả ngắn" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô tả ngắn" />
    ),
    cell: ({ row }) => {
      const bio = row.original.bio
      return <DataTableCellDescription description={bio} />
    }
  },
  {
    accessorKey: "experience",
    meta: { title: "Kinh nghiệm" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kinh nghiệm (năm)" center />
    ),
    cell: ({ row }) => {
      const experience = row.original.experience
      return <span className="flex justify-center pr-4">{experience}</span>
    }
  },
  {
    accessorKey: "bookingCount",
    meta: { title: "Số lượt đặt lịch" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượt đặt lịch" center />
    ),
    cell: ({ row }) => {
      const bookingCount = row.original.bookingCount
      return (
        <span className="flex justify-center pr-4">{bookingCount || 0}</span>
      )
    }
  },
  {
    accessorKey: "ratingCount",
    meta: { title: "Số lượt đánh giá" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượt đánh giá" center />
    ),
    cell: ({ row }) => {
      const ratingCount = row.original.ratingCount
      return (
        <span className="flex justify-center pr-4">{ratingCount || 0}</span>
      )
    }
  },
  {
    accessorKey: "averageRating",
    meta: { title: "Đánh giá trung bình" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Đánh giá trung bình"
        center
      />
    ),
    cell: ({ row }) => {
      const averageRating = row.original.averageRating
      return (
        <span className="flex justify-center pr-4">
          {averageRating.toFixed(1) || 0}
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
      return <DataTableDate date={createdAt} />
    }
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
    id: "actions",
    header: () => (
      <span className="flex items-center justify-center">Thao tác</span>
    ),
    cell: ({ row }) => {
      const consultantData = row.original

      return (
        <DataTableActionsCell
          id={consultantData.consultantId}
          isActive={consultantData.status}
          onViewDetail={handlers.onViewDetail}
          onUpdateStatus={(consultantId) =>
            handlers.onUpdateStatus?.(consultantId)
          }
          getConfirmDescription={(isActive) =>
            `Bạn có chắc muốn ${isActive ? "ngừng hoạt động" : "kích hoạt"} chuyên viên này?`
          }
        />
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
