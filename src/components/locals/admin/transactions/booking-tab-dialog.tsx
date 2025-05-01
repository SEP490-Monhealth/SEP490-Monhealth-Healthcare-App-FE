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
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="col-span-2 space-y-2">
        <Label htmlFor="bookingId">Mã lịch hẹn</Label>
        <Input
          id="bookingId"
          type="text"
          value={bookingData.bookingId}
          readOnly
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
        <Label htmlFor="notes">Ghi chú (nếu có)</Label>
        <Input
          id="notes"
          type="text"
          value={bookingData.notes || "--"}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <Input id="status" type="text" value={bookingStatusLabel} readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="isReviewed">Đánh giá</Label>
        <Input
          id="isReviewed"
          type="text"
          value={bookingData.isReviewed ? "Đã đánh giá" : "Chưa đánh giá"}
          readOnly
        />
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
        <Label htmlFor="evidenceUrls">Hình ảnh</Label>
        <Carousel>
          <CarouselContent>
            {bookingData.evidenceUrls.map((imageUrl, index) => (
              <CarouselItem key={index}>
                <div className="border-border flex items-center justify-center border">
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

export default BookingTabDialog
