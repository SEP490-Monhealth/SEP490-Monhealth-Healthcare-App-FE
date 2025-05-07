"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import UserInformationCard from "@/components/globals/molecules/user-information-card"

import { getGenderMeta } from "@/constants/enum/Metric"

import { MetricType } from "@/schemas/metricSchema"
import { UserType } from "@/schemas/userSchema"

import { formatDate } from "@/utils/formatters"

interface UserDetailTabDialogProps {
  userData: UserType
  metricData: MetricType
}

function UserDetailTabDialog({
  userData,
  metricData
}: UserDetailTabDialogProps) {
  const userInformationData = {
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    fullName: userData.fullName,
    avatarUrl: userData.avatarUrl
  }

  const { label: genderLabel } = getGenderMeta(metricData.gender)

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="col-span-2 space-y-2">
        <Label htmlFor="userId">Mã người dùng</Label>
        <Input disabled id="userId" type="text" value={userData.userId} />
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="">Người dùng</Label>
        <UserInformationCard
          role={userData.role}
          userData={userInformationData}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Ngày sinh</Label>
        <Input
          id="dateOfBirth"
          type="text"
          value={formatDate(metricData?.dateOfBirth || "")}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Giới tính</Label>
        <Input id="gender" type="text" value={genderLabel} readOnly />
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <Input
          id="status"
          type="text"
          value={userData.status ? "Hoạt động" : "Ngừng hoạt động"}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdAt">Ngày tạo</Label>
        <Input
          id="createdAt"
          type="text"
          value={formatDate(userData.createdAt)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdBy">Người tạo</Label>
        <Input
          id="createdBy"
          type="text"
          value={userData.createdBy || "--"}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedAt">Ngày cập nhật</Label>
        <Input
          id="updatedAt"
          type="text"
          value={formatDate(userData.updatedAt)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedBy">Người cập nhật</Label>
        <Input
          id="updatedBy"
          type="text"
          value={userData.updatedBy || "--"}
          readOnly
        />
      </div>
    </div>
  )
}

export default UserDetailTabDialog
