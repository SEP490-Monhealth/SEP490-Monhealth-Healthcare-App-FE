import React from "react"

import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/globals/atoms/carousel"
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import { Textarea } from "@/components/globals/atoms/textarea"

import { getReportStatusMeta } from "@/constants/enum/Report"

import { ReportType } from "@/schemas/reportSchema"

import { formatDate, formatTime } from "@/utils/formatters"

interface UserTabDialogProps {
  reportData: ReportType
}

function BookingTabDialog({ reportData }: UserTabDialogProps) {
  const { label: reportStatusLabel } = getReportStatusMeta(reportData.status)
  return (
    <div className="grid grid-cols-7 gap-x-6 gap-y-4">
      <div className="col-span-3">
        <Carousel>
          <CarouselContent>
            {reportData.imageUrls.map((imageUrl, index) => (
              <CarouselItem key={index} className="h-60 w-full">
                <div className="h-full w-full">
                  <Image
                    src={imageUrl}
                    alt={`reportImg-${index}`}
                    width={400}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="col-span-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bookingId">Mã lịch hẹn</Label>
          <Input
            id="bookingId"
            type="text"
            value={reportData.bookingId}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="datetime">Ngày giờ</Label>
          <Input
            id="datetime"
            type="text"
            value={`${formatDate(reportData.booking.date)}, ${formatTime(reportData.booking.startTime)} - ${formatTime(
              reportData.booking.endTime
            )}`}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Ghi chú (nếu có)</Label>
          <Textarea
            id="notes"
            rows={6}
            value={reportData.booking.notes || "--"}
            readOnly
          />
        </div>
      </div>

      <div className="col-span-7 space-y-2">
        <Label htmlFor="reason">Lý do</Label>
        <Textarea id="reason" rows={6} value={reportData.reason} readOnly />
      </div>

      <div className="col-span-7 space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <Input id="status" type="text" value={reportStatusLabel} readOnly />
      </div>
    </div>
  )
}

export default BookingTabDialog
