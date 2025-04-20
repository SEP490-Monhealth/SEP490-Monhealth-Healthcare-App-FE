"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/globals/atoms/badge"
import { Checkbox } from "@/components/globals/atoms/checkbox"

import DataTableActionsCell from "@/components/globals/molecules/data-table-action-cell"
import DataTableCellUser from "@/components/globals/molecules/data-table-cell-user"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"

import { UserType } from "@/schemas/userSchema"

import { formatPhoneNumber } from "@/utils/formatters"

export type ColumnActionsHandlers = {
  onViewDetail: (userId: string) => void
  onUpdateStatus: (userId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<UserType>[] => [
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
    accessorKey: "userId",
    meta: { title: "Mã người dùng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã người dùng" />
    )
  },
  {
    accessorKey: "fullName",
    meta: { title: "Họ tên" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Họ tên" />
    ),
    cell: ({ row }) => {
      const member = {
        fullName: row.original.fullName,
        email: row.original.email,
        avatarUrl: row.original.avatarUrl
      }

      return <DataTableCellUser user={member} />
    }
  },
  {
    accessorKey: "email",
    meta: { title: "Email" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    )
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
    accessorKey: "role",
    meta: { title: "Vai trò" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vai trò" center />
    ),
    cell: ({ row }) => {
      const role = row.original.role
      return (
        <div className="flex justify-center pr-4">
          <Badge variant="outline">{role}</Badge>
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
      const userData = row.original

      return (
        <DataTableActionsCell
          id={userData.userId}
          isActive={userData.status}
          onViewDetail={handlers.onViewDetail}
          onUpdateStatus={(userId) => handlers.onUpdateStatus?.(userId)}
          getConfirmDescription={(isActive) =>
            `Bạn có chắc muốn ${isActive ? "ngừng hoạt động" : "kích hoạt"} người dùng này?`
          }
        />
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
