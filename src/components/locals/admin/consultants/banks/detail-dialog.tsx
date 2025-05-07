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

import BankInformationCard from "@/components/globals/molecules/bank-information-card"
import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useConsultantBankById } from "@/hooks/useConsultantBank"

import { formatDate } from "@/utils/formatters"

interface ConsultantBankDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  consultantBankId: string | null
}

function ConsultantBankDetailDialog({
  isOpen,
  onClose,
  consultantBankId
}: ConsultantBankDetailDialogProps) {
  const {
    data: consultantBankData,
    isLoading: isConsultantBankLoading,
    error: consultantBankError
  } = useConsultantBankById(consultantBankId || "")

  console.log(JSON.stringify(consultantBankData, null, 2))

  const isLoading = isConsultantBankLoading
  const hasError = consultantBankError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết ngân hàng</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của ngân hàng chuyên viên.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !consultantBankData ? (
          <ErrorDialog
            message={consultantBankError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="consultantBankId">Mã ngân hàng</Label>
              <Input
                id="consultantBankId"
                type="text"
                value={consultantBankData.consultantBankId}
                readOnly
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="bank">Ngân hàng</Label>
              <BankInformationCard consultantBankData={consultantBankData} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(consultantBankData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(consultantBankData.updatedAt)}
                readOnly
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConsultantBankDetailDialog
