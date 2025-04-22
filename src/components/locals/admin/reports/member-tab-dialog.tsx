"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import UserInformationCard from "@/components/globals/molecules/user-information-card"

import { ReportType } from "@/schemas/reportSchema"

import { formatDate } from "@/utils/formatters"

interface MemberTabDialogProps {
  reportData: ReportType
}

function MemberTabDialog({ reportData }: MemberTabDialogProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="col-span-2 space-y-2">
        <Label htmlFor="reportId">Mã báo cáo</Label>
        <Input id="reportId" type="text" value={reportData.reportId} readOnly />
      </div>

      <div className="col-span-2">
        <UserInformationCard role="Member" userData={reportData.member} />
      </div>

      <div className="col-span-2">
        <UserInformationCard
          role="Consultant"
          userData={reportData.consultant}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdAt">Ngày tạo</Label>
        <Input
          id="createdAt"
          type="text"
          value={formatDate(reportData.createdAt)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedAt">Ngày cập nhật</Label>
        <Input
          id="updatedAt"
          type="text"
          value={formatDate(reportData.updatedAt)}
          readOnly
        />
      </div>
    </div>
  )
}

export default MemberTabDialog
