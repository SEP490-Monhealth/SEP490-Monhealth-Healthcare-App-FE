"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, MoreHorizontal } from "lucide-react"

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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/globals/atoms/hover-card"

import DataTableColumnHeader from "@/components/globals/molecules/data-table-column-header"
import DataTableDate from "@/components/globals/molecules/data-table-date"
import DataTableCellUser from "@/components/globals/molecules/data-table-user-cell"

import {
  VerificationStatusEnum,
  getConsultantVerificationMeta
} from "@/constants/enum/Consultant"

import { ConsultantType } from "@/schemas/consultantSchema"

import { formatPhoneNumber } from "@/utils/formatters"

export type ColumnActionsHandlers = {
  onViewDetail: (consultantId: string) => void
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
    accessorKey: "bio",
    meta: { title: "Mô tả" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô tả" />
    ),
    cell: ({ row }) => {
      const bio = row.original.bio
      return (
        <HoverCard>
          <HoverCardTrigger className="block max-w-[320px] cursor-pointer truncate hover:underline">
            {bio}
          </HoverCardTrigger>
          <HoverCardContent className="w-96">{bio}</HoverCardContent>
        </HoverCard>
      )
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
    accessorKey: "verificationStatus",
    meta: { title: "Trạng thái" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" center />
    ),
    cell: ({ row }) => {
      const verificationStatus = row.original
        .verificationStatus as VerificationStatusEnum
      const { label, color } = getConsultantVerificationMeta(verificationStatus)

      return (
        <div className="flex justify-center pr-4">
          <Badge className="text-white" style={{ backgroundColor: color }}>
            {label}
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
                  navigator.clipboard.writeText(consultantData.consultantId)
                }
              >
                <Copy className="h-4 w-4" />
                Sao chép mã
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handlers.onViewDetail(consultantData.consultantId)
                }
              >
                <Eye className="h-4 w-4" />
                Xem chi tiết
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
