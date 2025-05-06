"use client"

import React from "react"

import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/globals/atoms/carousel"
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import UserInformationCard from "@/components/globals/molecules/user-information-card"

import { getReportStatusMeta } from "@/constants/enum/Report"

import { ReportType } from "@/schemas/reportSchema"

import { formatDate } from "@/utils/formatters"

interface MemberTabDialogProps {
  reportData: ReportType
}

function MemberTabDialog({ reportData }: MemberTabDialogProps) {
  const { label: reportStatusLabel } = getReportStatusMeta(reportData.status)
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 pr-4 pb-2 pl-1">
      <div className="col-span-2 space-y-2">
        <Label htmlFor="reportId">Mã báo cáo</Label>
        <Input disabled id="reportId" type="text" value={reportData.reportId} />
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
        <Label htmlFor="reason">Lý do</Label>
        <Input id="reason" value={reportData.reason} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <Input id="status" type="text" value={reportStatusLabel} readOnly />
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

      <div className="col-span-2 space-y-2">
        <Label htmlFor="imageUrls">Hình ảnh</Label>

        <Carousel className="h-96 w-full">
          <CarouselContent>
            {reportData.imageUrls.map((imageUrl, index) => (
              <CarouselItem key={index} className="h-full w-full">
                <div className="border-border flex h-full w-full items-center justify-center border">
                  <Image
                    src={imageUrl}
                    alt={`evidence-${index}`}
                    width={400}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

export default MemberTabDialog
