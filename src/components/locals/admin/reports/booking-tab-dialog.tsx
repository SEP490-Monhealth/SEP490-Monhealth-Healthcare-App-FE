"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import { Textarea } from "@/components/globals/atoms/textarea"

import { ReportType } from "@/schemas/reportSchema"

import { formatDate, formatTime } from "@/utils/formatters"

interface UserTabDialogProps {
  reportData: ReportType
}

function BookingTabDialog({ reportData }: UserTabDialogProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="bookingId">Mã lịch hẹn</Label>
        <Input
          disabled
          id="bookingId"
          type="text"
          value={reportData.bookingId}
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
        <Label htmlFor="notes">Ghi chú lịch hẹn (nếu có)</Label>
        <Textarea
          rows={6}
          id="notes"
          value={reportData.booking.notes || "--"}
          readOnly
        />
      </div>
    </div>
  )
}

export default BookingTabDialog
