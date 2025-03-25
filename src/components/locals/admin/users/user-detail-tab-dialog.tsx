"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import { UserType } from "@/schemas/userSchema"

import { formatDate, formatPhoneNumber } from "@/utils/formatters"

interface UserDetailTabDialogProps {
  userData: UserType
}

function UserDetailTabDialog({ userData }: UserDetailTabDialogProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="space-y-2">
        <Label htmlFor="userId">Mã người dùng</Label>
        <Input id="userId" type="text" value={userData.userId} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">Họ và tên</Label>
        <Input id="fullName" type="text" value={userData.fullName} disabled />
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
          value={formatDate(userData.createdAt)}
          disabled
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdBy">Người tạo</Label>
        <Input id="createdBy" type="text" value={userData.createdBy} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedAt">Ngày cập nhật</Label>
        <Input
          id="updatedAt"
          type="text"
          value={formatDate(userData.updatedAt)}
          disabled
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedBy">Người cập nhật</Label>
        <Input id="updatedBy" type="text" value={userData.updatedBy} disabled />
      </div>
    </div>
  )
}

export default UserDetailTabDialog
