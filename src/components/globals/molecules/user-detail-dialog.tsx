"use client"

import React from "react"

import { Badge } from "@/components/globals/atoms/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"

import { UserType } from "@/schemas/userSchema"

import { formatDateTime, formatPhoneNumber } from "@/utils/formatters"

interface UserDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  user: UserType | null
}

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({
  isOpen,
  onClose,
  user
}) => {
  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Chi tiết người dùng</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Mã người dùng
              </p>
              <p className="font-medium">{user.userId}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Trạng thái
              </p>
              <div>
                <Badge variant={user.status ? "default" : "destructive"}>
                  {user.status ? "Hoạt động" : "Ngừng hoạt động"}
                </Badge>
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Họ tên
              </p>
              <p className="font-medium capitalize">{user.fullName}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Vai trò
              </p>
              <p className="font-medium">{user.role}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Số điện thoại
              </p>
              <p className="font-medium">
                {formatPhoneNumber(user.phoneNumber)}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Ngày tạo
              </p>
              <p className="font-medium">{formatDateTime(user.createdAt)}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Người tạo
              </p>
              <p className="font-medium">{user.createdBy}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Ngày cập nhật
              </p>
              <p className="font-medium">{formatDateTime(user.updatedAt)}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm font-medium">
                Người cập nhật
              </p>
              <p className="font-medium">{user.updatedBy}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserDetailDialog
