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

import { useExpertiseById } from "@/hooks/useExpertise"

import { formatDate } from "@/utils/formatters"

import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"
import ErrorDialog from "./error-dialog"
import LoadingDialog from "./loading-dialog"

interface ExpertiseDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  expertiseId: string | null
}

function ExpertiseDetailDialog({
  isOpen,
  onClose,
  expertiseId
}: ExpertiseDetailDialogProps) {
  const {
    data: expertiseData,
    isLoading,
    error
  } = useExpertiseById(expertiseId || "")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[520px] min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết chuyên môn</DialogTitle>
          <DialogDescription>
            Xem và quản lý thông tin chi tiết của chuyên môn.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : error || !expertiseData ? (
          <ErrorDialog
            message={
              error
                ? (error as Error).message || "Không thể tải dữ liệu."
                : "Không có dữ liệu chuyên môn."
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="expertiseId">Mã chuyên môn</Label>
              <Input
                id="expertiseId"
                type="text"
                value={expertiseData.expertiseId}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Tên chuyên môn</Label>
              <Input
                id="name"
                type="text"
                value={expertiseData.name}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Input
                id="description"
                type="text"
                value={expertiseData.description}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(expertiseData.createdAt)}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={expertiseData.createdBy}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(expertiseData.updatedAt)}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={expertiseData.updatedBy}
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

export default ExpertiseDetailDialog
