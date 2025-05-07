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

import { useWaterReminderById } from "@/hooks/useWaterReminder"

import { formatDate } from "@/utils/formatters"

interface WaterReminderDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  waterReminderId: string | null
}

function WaterReminderDetailDialog({
  isOpen,
  onClose,
  waterReminderId
}: WaterReminderDetailDialogProps) {
  const {
    data: waterReminderData,
    isLoading: isWaterReminderLoading,
    error: waterReminderError
  } = useWaterReminderById(waterReminderId || "")

  const isLoading = isWaterReminderLoading
  const hasError = waterReminderError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết nhắc nhở</DialogTitle>
          <DialogDescription>
            Xem và quản lý thông tin chi tiết của nhắc nhở.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !waterReminderData ? (
          <ErrorDialog
            message={waterReminderError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="waterReminderId">Mã nhắc nhở</Label>
              <Input
                disabled
                id="waterReminderId"
                type="text"
                value={waterReminderData.waterReminderId}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Tên nhắc nhở</Label>
              <Input
                id="name"
                type="text"
                value={waterReminderData.name}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Dung tích</Label>

              <div className="relative">
                <Input
                  id="volume"
                  type="number"
                  value={waterReminderData.volume}
                  readOnly
                />
                <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                  ml
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="isRecurring">Tần suất lặp lại</Label>
              <Input
                id="isRecurring"
                type="text"
                value={
                  waterReminderData.isRecurring
                    ? "Lặp lại hằng ngày"
                    : "Không lặp lại"
                }
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Input
                id="status"
                type="text"
                value={
                  waterReminderData.status ? "Hoạt động" : "Ngừng hoạt động"
                }
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(waterReminderData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={waterReminderData.createdBy || "--"}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(waterReminderData.updatedAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={waterReminderData.updatedBy || "--"}
                readOnly
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WaterReminderDetailDialog
