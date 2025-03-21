"use client"

import React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/atoms/dialog"

import { useWaterReminderById } from "@/hooks/useWaterReminder"

import { formatDate, formatPhoneNumber } from "@/utils/formatters"

import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"
import ErrorDialog from "./error-dialog"
import LoadingDialog from "./loading-dialog"

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
    isLoading,
    error
  } = useWaterReminderById(waterReminderId || "")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[520px] min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết nhắc nhở</DialogTitle>
          <DialogDescription>
            Xem và quản lý thông tin chi tiết của nhắc nhở.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : error || !waterReminderData ? (
          <ErrorDialog
            message={
              error
                ? (error as Error).message || "Không thể tải dữ liệu."
                : "Không có dữ liệu nhắc nhở."
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="waterReminderId">Mã nhắc nhở</Label>
              <Input
                id="waterReminderId"
                type="text"
                value={waterReminderData.waterReminderId}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Tên nhắc nhở</Label>
              <Input
                id="name"
                type="text"
                value={waterReminderData.name}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Dung tích</Label>
              <Input
                id="volume"
                type="number"
                value={waterReminderData.volume}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isRecurring">Lặp lại</Label>
              <Input
                id="isRecurring"
                type="text"
                value={waterReminderData.isRecurring ? "Có" : "Không"}
                disabled
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
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(waterReminderData.createdAt)}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={waterReminderData.createdBy}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(waterReminderData.updatedAt)}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={waterReminderData.updatedBy}
                disabled
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

export default WaterReminderDetailDialog
