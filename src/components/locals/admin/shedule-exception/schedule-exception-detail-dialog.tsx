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

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useScheduleExceptionById } from "@/hooks/useScheduleException"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

interface ExceptionDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  exceptionId: string | null
}

function ScheduleExceptionDetailDialog({
  isOpen,
  onClose,
  exceptionId
}: ExceptionDetailDialogProps) {
  const {
    data: exceptionData,
    isLoading: isExceptionLoading,
    error: exceptionError
  } = useScheduleExceptionById(exceptionId || "")

  const isLoading = isExceptionLoading
  const hasError = exceptionError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết lịch ngoại lệ</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của lịch ngoại lệ.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !exceptionData ? (
          <ErrorDialog
            message={exceptionError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="exceptionId">Mã lịch ngoại lệ</Label>
              <Input
                id="exceptionId"
                type="text"
                value={exceptionData.exceptionId}
                readOnly
              />
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
              <div className="col-span-1">
                <div className="flex-shrink-0">
                  <Avatar className="h-full w-48 rounded-md">
                    <AvatarImage src={exceptionData.consultant.avatarUrl} />
                    <AvatarFallback>
                      {getInitials(exceptionData.consultant.fullName)}
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
                    value={exceptionData.consultant.fullName}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    value={exceptionData.consultant.email}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={exceptionData.consultant.phoneNumber}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-4 gap-x-6 gap-y-4">
              <div className="col-span-1 space-y-2">
                <Label htmlFor="date">Lịch ngoại lệ</Label>
                <Input
                  id="date"
                  type="text"
                  value={formatDate(exceptionData.date)}
                  readOnly
                />
              </div>

              <div className="col-span-3 space-y-2">
                <Label htmlFor="reason">Lý do</Label>
                <Input
                  id="reason"
                  type="text"
                  value={exceptionData.reason}
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(exceptionData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(exceptionData.updatedAt)}
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

export default ScheduleExceptionDetailDialog
