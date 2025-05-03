"use client"

import React from "react"

import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import UserInformationCard from "@/components/globals/molecules/user-information-card"

import {
  BookingStatusEnum,
  getBookingStatusMeta
} from "@/constants/enum/Booking"

import { BookingType } from "@/schemas/bookingSchema"

import { formatDate, formatTime } from "@/utils/formatters"

interface BookingTabDialogProps {
  bookingData: BookingType
}

function BookingTabDialog({ bookingData }: BookingTabDialogProps) {
  const { label: bookingStatusLabel } = getBookingStatusMeta(
    bookingData?.status || BookingStatusEnum.Booked
  )

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 pr-4 pb-2 pl-1">
      <div className="col-span-2 space-y-2">
        <Label htmlFor="bookingId">Mã lịch hẹn</Label>
        <Input
          id="bookingId"
          type="text"
          value={bookingData.bookingId}
          readOnly
        />
      </div>

      <div className="col-span-2">
        <UserInformationCard role="Member" userData={bookingData.member} />
      </div>

      <div className="col-span-2">
        <UserInformationCard
          role="Consultant"
          userData={bookingData.consultant}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="datetime">Ngày giờ</Label>
        <Input
          id="datetime"
          type="text"
          value={`${formatDate(bookingData.date)}, ${formatTime(bookingData.startTime)} - ${formatTime(
            bookingData.endTime
          )}`}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <Input id="status" type="text" value={bookingStatusLabel} readOnly />
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="meetingUrl">Link phòng họp</Label>
        <Input
          id="meetingUrl"
          type="text"
          value={bookingData.meetingUrl}
          readOnly
        />
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="notes">Ghi chú (nếu có)</Label>
        <Input
          id="notes"
          type="text"
          value={bookingData.notes || "--"}
          readOnly
        />
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="cancellationReason">Lý do hủy (nếu có)</Label>
        <Input
          id="cancellationReason"
          type="text"
          value={bookingData.cancellationReason || "--"}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdAt">Ngày tạo</Label>
        <Input
          id="createdAt"
          type="text"
          value={formatDate(bookingData.createdAt)}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="updatedAt">Ngày cập nhật</Label>
        <Input
          id="updatedAt"
          type="text"
          value={formatDate(bookingData.updatedAt)}
          readOnly
        />
      </div>
    </div>
  )
}
export default BookingTabDialog
