"use client"

import React, { useState } from "react"

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

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"
import UserInformationCard from "@/components/globals/molecules/user-information-card"

import {
  ScheduleExceptionStatusEnum,
  getScheduleExceptionStatusMeta
} from "@/constants/enum/Schedule"

import {
  useApproveScheduleException,
  useRejectScheduleException,
  useScheduleExceptionById
} from "@/hooks/useScheduleException"

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
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<"approve" | "reject">()

  const { mutate: approveScheduleException } = useApproveScheduleException()
  const { mutate: rejectScheduleException } = useRejectScheduleException()

  const {
    data: scheduleExceptionData,
    isLoading: isScheduleExceptionLoading,
    error: scheduleExceptionError
  } = useScheduleExceptionById(scheduleExceptionId || "")

  const { label: scheduleExceptionStatusLabel } =
    getScheduleExceptionStatusMeta(
      scheduleExceptionData?.status || ScheduleExceptionStatusEnum.Pending
    )

  const handleActionReport = (type: "approve" | "reject") => {
    setAlertType(type)
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleConfirm = async () => {
    if (alertType === "approve") {
      await approveScheduleException({
        scheduleExceptionId: scheduleExceptionData?.scheduleExceptionId || ""
      })
    } else {
      await rejectScheduleException({
        scheduleExceptionId: scheduleExceptionData?.scheduleExceptionId || ""
      })
    }
  }

  const isLoading = isScheduleExceptionLoading
  const hasError = scheduleExceptionError

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
            message={
              scheduleExceptionError?.message || "Không thể tải dữ liệu."
            }
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

            <div className="col-span-2">
              <UserInformationCard
                role="Consultant"
                userData={scheduleExceptionData.consultant}
              />
            </div>

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
                value={scheduleExceptionStatusLabel}
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
          <div className="flex w-full items-end justify-between">
            {scheduleExceptionData && (
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>
            )}

            {scheduleExceptionData?.status ===
              ScheduleExceptionStatusEnum.Pending && (
              <div className="space-x-4">
                <Button
                  variant="destructive"
                  onClick={() => handleActionReport("reject")}
                >
                  Từ chối
                </Button>

                <Button
                  variant="default"
                  onClick={() => handleActionReport("approve")}
                >
                  Xác nhận
                </Button>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>

      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={handleConfirm}
        title={`${alertType === "approve" ? "Xác nhận" : "Từ chối"} lịch nghỉ`}
        description={`Bạn có chắc chắn muốn ${alertType === "approve" ? "xác nhận" : "từ chối"}  lịch nghỉ này?`}
      />
    </Dialog>
  )
}

export default ExceptionDetailDialog
