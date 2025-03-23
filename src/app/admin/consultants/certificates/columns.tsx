"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Ban, Circle, Copy, Eye, MoreHorizontal } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/globals/atoms/avatar"
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

import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"

import { useUserStatus } from "@/hooks/useUser"

import { UserType } from "@/schemas/userSchema"

import { formatDate, formatPhoneNumber } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

export type ColumnActionsHandlers = {
  onViewDetail: (userId: string) => void
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
      const fullName = row.original.fullName
      const email = row.original.email
      const avatarUrl = row.original.avatarUrl

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatarUrl || ""} alt={getInitials(fullName)} />
            <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="capitalize">{fullName}</span>
            <span className="text-muted-foreground text-sm">{email}</span>
          </div>
        </div>
      )
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
      const { mutate: updateUserStatus } = useUserStatus()

      const userData = row.original
      const isActive = userData.status

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
                onClick={() => navigator.clipboard.writeText(userData.userId)}
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlers.onViewDetail(userData.userId)}
              >
                <Eye className="h-4 w-4" />
                Xem chi tiết
              </DropdownMenuItem>

              <Separator />

              <DropdownMenuItem
                variant={isActive ? "destructive" : "default"}
                onClick={() => updateUserStatus({ userId: userData.userId })}
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
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
