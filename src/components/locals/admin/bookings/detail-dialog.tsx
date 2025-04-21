"use client"

import React from "react"

import { Button } from "@/components/globals/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"
import { ScrollArea } from "@/components/globals/atoms/scroll-area"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"
import UserInformationCard from "@/components/globals/molecules/user-information-card"

import {
  BookingStatusEnum,
  getBookingStatusMeta
} from "@/constants/enum/Booking"

import { useBookingById } from "@/hooks/useBooking"

import { formatDate, formatTime } from "@/utils/formatters"

interface BookingDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  bookingId: string | null
}

function BookingDetailDialog({
  isOpen,
  onClose,
  bookingId
}: BookingDetailDialogProps) {
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    error: bookingError
  } = useBookingById(bookingId || "")

  const { label: bookingStatusLabel } = getBookingStatusMeta(
    bookingData?.status || BookingStatusEnum.Pending
  )

  const isLoading = isBookingLoading
  const hasError = bookingError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của lịch hẹn.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !bookingData ? (
          <ErrorDialog
            message={bookingError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <ScrollArea className="h-[60vh] overflow-hidden pr-4">
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

              <div className="col-span-2">
                <UserInformationCard
                  role="Member"
                  userData={bookingData.member}
                />
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
                <Input
                  id="status"
                  type="text"
                  value={bookingStatusLabel}
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
            </div>{" "}
          </ScrollArea>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingDetailDialog
