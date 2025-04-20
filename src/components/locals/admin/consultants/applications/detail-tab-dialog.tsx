"use client"

import React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/globals/atoms/avatar"
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import { Textarea } from "@/components/globals/atoms/textarea"

import { ConsultantType } from "@/schemas/consultantSchema"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

interface DetailTabDialogProps {
  consultantData: ConsultantType
}

function DetailTabDialog({ consultantData }: DetailTabDialogProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <Avatar className="h-full w-48 rounded-xl">
            <AvatarImage src={consultantData.avatarUrl} />
            <AvatarFallback className="rounded-xl">
              {getInitials(consultantData.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="col-span-2 space-y-2">
            <Label htmlFor="consultantId">Mã chuyên viên</Label>
            <Input
              id="consultantId"
              type="text"
              value={consultantData.consultantId}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Tên chuyên viên</Label>
            <Input
              id="name"
              type="text"
              value={consultantData.fullName}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Số điện thoại</Label>
            <Input
              id="phoneNumber"
              type="text"
              value={consultantData.phoneNumber}
              readOnly
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={consultantData.email}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
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
          <Label htmlFor="experience">Kinh nghiệm (năm)</Label>
          <Input
            id="experience"
            type="number"
            value={consultantData.experience}
            readOnly
          />
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
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="bio">Mô tả ngắn</Label>
          <Textarea id="bio" rows={6} value={consultantData.bio} readOnly />
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

export default DetailTabDialog
