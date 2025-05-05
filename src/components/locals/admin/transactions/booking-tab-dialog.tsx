"use client"

import React, { useRef, useState } from "react"

import Image from "next/image"

import { Check, Copy } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/globals/atoms/carousel"
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/globals/atoms/tooltip"

import {
  BookingStatusEnum,
  getBookingStatusMeta
} from "@/constants/enum/Booking"

import { cn } from "@/lib/utils"

import { BookingType } from "@/schemas/bookingSchema"

import { formatDate, formatTime } from "@/utils/formatters"

interface BookingTabDialogProps {
  bookingData: BookingType
}

function BookingTabDialog({ bookingData }: BookingTabDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [copied, setCopied] = useState<boolean>(false)

  const { label: bookingStatusLabel } = getBookingStatusMeta(
    bookingData?.status || BookingStatusEnum.Booked
  )

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

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

      <div className="col-span-2 space-y-2 *:not-first:mt-2">
        <Label htmlFor="meetingUrl">Link phòng họp</Label>
        <div className="relative">
          <Input
            ref={inputRef}
            id="meetingUrl"
            type="text"
            value={bookingData.meetingUrl}
            readOnly
          />
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCopy}
                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                  aria-label={copied ? "Copied" : "Copy to clipboard"}
                  disabled={copied}
                >
                  <div
                    className={cn(
                      "transition-all",
                      copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    )}
                  >
                    <Check
                      size={16}
                      className="stroke-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    className={cn(
                      "absolute cursor-pointer transition-all",
                      copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    )}
                  >
                    <Copy size={16} aria-hidden="true" />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">
                Copy to clipboard
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
