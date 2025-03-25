"use client"

import React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/globals/atoms/avatar"
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
import { Textarea } from "@/components/globals/atoms/textarea"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { getBookingStatusMeta } from "@/constants/enum/Booking"

import { useBookingById } from "@/hooks/useBooking"

import { formatDate, formatDateAndHour } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

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
    isLoading,
    error
  } = useBookingById(bookingId || "")

  const label = bookingData
    ? getBookingStatusMeta(bookingData.status).label
    : ""

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[520px] min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của lịch hẹn.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : error || !bookingData ? (
          <ErrorDialog
            message={
              error
                ? (error as Error).message || "Không thể tải dữ liệu."
                : "Không có dữ liệu lịch hẹn."
            }
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bookingId">Mã lịch hẹn</Label>
                <Input
                  id="bookingId"
                  type="text"
                  value={bookingData.bookingId}
                  disabled
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="createdAt">Ngày tạo</Label>
                  <Input
                    id="createdAt"
                    type="text"
                    value={formatDate(bookingData.createdAt)}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                  <Input
                    id="updatedAt"
                    type="text"
                    value={formatDate(bookingData.updatedAt)}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="grid-row-3 grid grid-cols-3 gap-6">
              <div className="col-span-1 row-span-3">
                <Avatar className="h-full w-full rounded-md">
                  <AvatarImage src={bookingData.member.memberAvatar} />
                  <AvatarFallback>
                    {getInitials(bookingData.member.memberName)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="col-span-2 row-span-3 space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="memberName">Tên người dùng</Label>
                  <Input
                    id="memberName"
                    type="text"
                    value={bookingData.member.memberName}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại người dùng</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={bookingData.member.phoneNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email người dùng</Label>
                  <Input
                    id="email"
                    type="text"
                    value={bookingData.member.email}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="grid-row-3 grid grid-cols-3 gap-6">
              <div className="col-span-1 row-span-3">
                <Avatar className="h-full w-full rounded-md">
                  <AvatarImage src={bookingData.consultant.consultantAvatar} />
                  <AvatarFallback>
                    {getInitials(bookingData.consultant.consultantName)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="col-span-2 row-span-3 space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="memberName">Tên chuyên viên</Label>
                  <Input
                    id="memberName"
                    type="text"
                    value={bookingData.consultant.consultantName}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại chuyên viên</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={bookingData.consultant.phoneNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email chuyên viên</Label>
                  <Input
                    id="email"
                    type="text"
                    value={bookingData.consultant.email}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
              <div className="space-y-2">
                <Label htmlFor="date">Ngày giờ</Label>
                <Input
                  id="date"
                  type="text"
                  value={formatDateAndHour(bookingData.date)}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Input id="status" type="text" value={label} disabled />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú (nếu có)</Label>
                <Textarea
                  id="notes"
                  rows={2}
                  value={bookingData.notes || "--"}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cancellationReason">Lý do hủy (nếu có)</Label>
                <Textarea
                  id="cancellationReason"
                  rows={2}
                  value={bookingData.cancellationReason || "--"}
                  disabled
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingDetailDialog
