"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import { Textarea } from "@/components/globals/atoms/textarea"

import UserInformationCard from "@/components/globals/molecules/user-information-card"

import { getConsultantVerificationMeta } from "@/constants/enum/Consultant"

import { ConsultantType } from "@/schemas/consultantSchema"

import { formatDate } from "@/utils/formatters"

interface ConsultantDetailTabDialogProps {
  consultantData: ConsultantType
}

function ConsultantDetailTabDialog({
  consultantData
}: ConsultantDetailTabDialogProps) {
  const { label: consultantVerificationLabel } = getConsultantVerificationMeta(
    consultantData?.verificationStatus
  )

  const consultantInformationData = {
    email: consultantData.email,
    phoneNumber: consultantData.phoneNumber,
    fullName: consultantData.fullName,
    avatarUrl: consultantData.avatarUrl
  }

  return (
    <div className="flex flex-col gap-4 pr-4 pb-2 pl-1">
      <div className="space-y-2">
        <Label htmlFor="consultantId">Mã chuyên viên</Label>
        <Input
          disabled
          id="consultantId"
          type="text"
          value={consultantData.consultantId}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="">Chuyên viên</Label>
        <UserInformationCard
          role="Consultant"
          userData={consultantInformationData}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label htmlFor="expertise">Chuyên môn</Label>
          <Input
            id="expertise"
            type="text"
            value={consultantData.expertise}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Kinh nghiệm</Label>

          <div className="relative">
            <Input
              id="experience"
              type="number"
              value={consultantData.experience}
              readOnly
            />
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
              năm
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="bio">Mô tả ngắn</Label>
          <Textarea id="bio" rows={6} value={consultantData.bio} readOnly />
        </div>

        <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="bookingCount">Số lượt đặt lịch</Label>
            <Input
              id="bookingCount"
              type="number"
              value={consultantData.bookingCount || 0}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ratingCount">Số lượt đánh giá</Label>
            <Input
              id="ratingCount"
              type="number"
              value={consultantData.ratingCount || 0}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="averageRating">Đánh giá trung bình</Label>
            <Input
              id="averageRating"
              type="number"
              value={consultantData.averageRating || 0}
              readOnly
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Trạng thái</Label>
          <Input
            id="status"
            type="text"
            value={consultantData.status ? "Hoạt động" : "Ngừng hoạt động"}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="verificationStatus">Xác thực</Label>
          <Input
            id="verificationStatus"
            type="text"
            value={consultantVerificationLabel}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="createdAt">Ngày tạo</Label>
          <Input
            id="createdAt"
            type="text"
            value={formatDate(consultantData.createdAt)}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="updatedAt">Ngày cập nhật</Label>
          <Input
            id="updatedAt"
            type="text"
            value={formatDate(consultantData.updatedAt || "--")}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default ConsultantDetailTabDialog
