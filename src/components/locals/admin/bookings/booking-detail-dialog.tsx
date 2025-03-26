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

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { getBookingStatusMeta } from "@/constants/enum/Booking"

import { useBookingById } from "@/hooks/useBooking"

import { formatDate } from "@/utils/formatters"

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
              <Label htmlFor="member.fullName">Tên người dùng</Label>
              <Input
                id="member.fullName"
                type="text"
                value={bookingData.member.fullName}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="member.email">Email người dùng</Label>
              <Input
                id="member.email"
                type="email"
                value={bookingData.member.email}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="member.phoneNumber">
                Số điện thoại người dùng
              </Label>
              <Input
                id="member.phoneNumber"
                type="text"
                value={bookingData.member.phoneNumber}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultant.fullName">Tên chuyên viên</Label>
              <Input
                id="consultant.fullName"
                type="text"
                value={bookingData.consultant.fullName}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultant.email">Email chuyên viên</Label>
              <Input
                id="consultant.email"
                type="email"
                value={bookingData.consultant.email}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultant.phoneNumber">
                Số điện thoại chuyên viên
              </Label>
              <Input
                id="consultant.phoneNumber"
                type="text"
                value={bookingData.consultant.phoneNumber}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Ngày giờ</Label>
              <Input
                id="date"
                type="text"
                value={formatDate(bookingData.date)}
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
              <Label htmlFor="cancellationReason">Lý do hủy (nếu có)</Label>
              <Input
                id="cancellationReason"
                type="text"
                value={bookingData.cancellationReason || "--"}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Input id="status" type="text" value={label} readOnly />
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
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={bookingData.createdBy}
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

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={bookingData.updatedBy}
                readOnly
              />
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
