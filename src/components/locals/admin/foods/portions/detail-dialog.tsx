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

import { usePortionById } from "@/hooks/usePortion"

import { formatDate } from "@/utils/formatters"

interface PortionDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  portionId: string | null
}

function PortionDetailDialog({
  isOpen,
  onClose,
  portionId
}: PortionDetailDialogProps) {
  const {
    data: portionData,
    isLoading: isPortionLoading,
    error: portionError
  } = usePortionById(portionId || "")

  const isLoading = isPortionLoading
  const hasError = portionError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết khẩu phần</DialogTitle>
          <DialogDescription>
            Xem và quản lý thông tin chi tiết của khẩu phần.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !portionData ? (
          <ErrorDialog
            message={portionError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="portionId">Mã khẩu phần</Label>
              <Input
                id="portionId"
                type="text"
                value={portionData.portionId}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Tên khẩu phần</Label>
              <Input id="size" type="text" value={portionData.size} readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Định lượng</Label>
              <Input
                id="weight"
                type="number"
                value={portionData.weight}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Đơn vị</Label>
              <Input id="unit" type="text" value={portionData.unit} readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(portionData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={portionData.createdBy || "--"}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(portionData.updatedAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={portionData.updatedBy || "--"}
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

export default PortionDetailDialog
