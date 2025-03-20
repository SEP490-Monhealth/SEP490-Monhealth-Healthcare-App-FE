"use client"

import React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/atoms/dialog"

import { useUserById } from "@/hooks/useUser"

import { formatDateTime, formatPhoneNumber } from "@/utils/formatters"

import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"
import ErrorDialog from "./error-dialog"
import LoadingDialog from "./loading-dialog"

interface UserDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  userId: string | null
}

function UserDetailDialog({ isOpen, onClose, userId }: UserDetailDialogProps) {
  const { data: userData, isLoading, error } = useUserById(userId || "")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[520px] min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết người dùng</DialogTitle>
          <DialogDescription>
            Xem và quản lý thông tin chi tiết của người dùng.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : error || !userData ? (
          <ErrorDialog
            message={
              error
                ? (error as Error).message || "Không thể tải dữ liệu."
                : "Không có dữ liệu người dùng."
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">Mã người dùng</Label>
              <Input id="userId" type="text" value={userData.userId} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                type="text"
                value={userData.fullName}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={userData.email} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                id="phoneNumber"
                type="text"
                value={formatPhoneNumber(userData.phoneNumber)}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Vai trò</Label>
              <Input id="role" type="text" value={userData.role} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Input
                id="status"
                type="text"
                value={userData.status ? "Hoạt động" : "Ngừng hoạt động"}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDateTime(userData.createdAt)}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={userData.createdBy}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDateTime(userData.updatedAt)}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={userData.updatedBy}
                disabled
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserDetailDialog
