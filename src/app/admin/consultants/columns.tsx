"use client"

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
import { DataTableColumnHeader } from "@/components/globals/molecules/data-table-column-header"

import { ConsultantType } from "@/schemas/consultantSchema"

import { formatDate } from "@/utils/formatters"

export const columns: ColumnDef<ConsultantType>[] = [
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
      const fullName = row.original.fullName
      return <span className="capitalize">{fullName}</span>
    }
  },
  // {
  //   accessorKey: "phoneNumber",
  //   meta: { title: "Số điện thoại" },
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Số điện thoại" />
  //   ),
  //   cell: ({ row }) => {
  //     const phoneNumber = row.original.phoneNumber
  //     return <span>{formatPhoneNumber(phoneNumber)}</span>
  //   }
  // },
  {
    accessorKey: "bio",
    meta: { title: "Mô tả" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô tả" />
    ),
    cell: ({ row }) => {
      const bio = row.original.bio
      return (
        <span title={bio} className="block max-w-[320px] truncate">
          {bio}
        </span>
      )
    }
  },
  {
    accessorKey: "experience",
    meta: { title: "Kinh nghiệm (năm)" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kinh nghiệm (Năm)" center />
    ),
    cell: ({ row }) => {
      const experience = row.original.experience
      return <span className="flex justify-center pr-4">{experience}</span>
    }
  },
  {
    accessorKey: "ratingCount",
    meta: { title: "Số đánh giá" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số đánh giá" center />
    ),
    cell: ({ row }) => {
      const ratingCount = row.original.ratingCount
      return <span className="flex justify-center pr-4">{ratingCount}</span>
    }
  },
  {
    accessorKey: "averageRating",
    meta: { title: "Đánh giá" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Đánh giá" center />
    ),
    cell: ({ row }) => {
      const averageRating = row.original.averageRating
      return (
        <span className="flex justify-center pr-4">
          {averageRating.toFixed(1)}
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
      const consultantData = row.original
      const isActive = consultantData.status

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
              <DropdownMenuItem>
                <Eye className="h-4 w-4" />
                Xem chi tiết
              </DropdownMenuItem>

              <Separator />

              <DropdownMenuItem variant={isActive ? "destructive" : "default"}>
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
