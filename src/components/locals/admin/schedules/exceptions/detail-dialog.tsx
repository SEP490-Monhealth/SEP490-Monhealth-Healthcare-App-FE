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

import { useScheduleExceptionById } from "@/hooks/useScheduleException"

import { formatDate } from "@/utils/formatters"

interface ExceptionDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  scheduleExceptionId: string | null
}

function ExceptionDetailDialog({
  isOpen,
  onClose,
  scheduleExceptionId
}: ExceptionDetailDialogProps) {
  const {
    data: scheduleExceptionData,
    isLoading: isExceptionLoading,
    error: exceptionError
  } = useScheduleExceptionById(scheduleExceptionId || "")

  const isLoading = isExceptionLoading
  const hasError = exceptionError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết lịch nghỉ</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của lịch nghỉ.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !scheduleExceptionData ? (
          <ErrorDialog
            message={exceptionError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="scheduleExceptionId">Mã lịch nghỉ</Label>
              <Input
                id="scheduleExceptionId"
                type="text"
                value={scheduleExceptionData.scheduleExceptionId}
                readOnly
              />
            </div>

            {/* <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
              <div className="col-span-1">
                <div className="flex-shrink-0">
                  <Avatar className="h-full w-48 rounded-xl">
                    <AvatarImage
                      src={scheduleExceptionData.consultant.avatarUrl}
                      alt={getInitials(
                        scheduleExceptionData.consultant.fullName
                      )}
                    />
                    <AvatarFallback className="rounded-xl">
                      {getInitials(scheduleExceptionData.consultant.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Tên chuyên viên</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={scheduleExceptionData.consultant.fullName}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    value={scheduleExceptionData.consultant.email}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={scheduleExceptionData.consultant.phoneNumber}
                    readOnly
                  />
                </div>
              </div>
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="date">Lịch nghỉ</Label>
              <Input
                id="date"
                type="text"
                value={formatDate(scheduleExceptionData.date)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Input
                id="status"
                type="text"
                value={
                  scheduleExceptionData.status ? "Xác nhận" : "Chưa xác nhận"
                }
                readOnly
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="reason">Lý do</Label>
              <Input
                id="reason"
                type="text"
                value={scheduleExceptionData.reason}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(scheduleExceptionData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(scheduleExceptionData.updatedAt)}
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

export default ExceptionDetailDialog
