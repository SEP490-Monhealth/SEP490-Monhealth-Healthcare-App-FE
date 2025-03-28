"use client"

import { useState } from "react"

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

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"

import { useBankStatus } from "@/hooks/useBank"

import { BankType } from "@/schemas/bankSchema"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

export type ColumnActionsHandlers = {
  onViewDetail: (bankId: string) => void
}

export const createColumns = (
  handlers: ColumnActionsHandlers
): ColumnDef<BankType>[] => [
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
    accessorKey: "bankId",
    meta: { title: "Mã ngân hàng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã ngân hàng" />
    )
  },
  {
    accessorKey: "name",
    meta: { title: "Tên ngân hàng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên ngân hàng" />
    )
  },
  {
    accessorKey: "shortName",
    meta: { title: "Ngân hàng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngân hàng" />
    ),
    cell: ({ row }) => {
      const shortName = row.original.shortName
      const avatarUrl = row.original.logoUrl

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatarUrl || ""} alt={getInitials(shortName)} />
            <AvatarFallback>{getInitials(shortName)}</AvatarFallback>
          </Avatar>
          <span className="capitalize">{shortName}</span>
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
    id: "actions",
    header: () => (
      <span className="flex items-center justify-center">Thao tác</span>
    ),
    cell: ({ row }) => {
      const { mutate: updateBankStatus } = useBankStatus()

      const bankData = row.original
      const isActive = bankData.status

      const [openAlert, setOpenAlert] = useState<boolean>(false)

      const handleOpenAlert = (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenAlert(true)
      }

      const handleCloseAlert = () => {
        setOpenAlert(false)
      }

      const handleConfirm = () => {
        updateBankStatus({ bankId: bankData.bankId })
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
                onClick={() => navigator.clipboard.writeText(bankData.bankId)}
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlers.onViewDetail(bankData.bankId)}
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
            } ngân hàng này?`}
          />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
