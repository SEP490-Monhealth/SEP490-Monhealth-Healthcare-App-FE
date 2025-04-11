"use client"

import React from "react"

import Image from "next/image"

import { Badge } from "@/components/globals/atoms/badge"
import { Button } from "@/components/globals/atoms/button"
import { Card } from "@/components/globals/atoms/card"
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
    data: consultantBank,
    isLoading: isConsultantBankLoading,
    error: consultantBankError
  } = useConsultantBankById(consultantBankId || "")

  const isLoading = isConsultantBankLoading
  const hasError = consultantBankError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[500px]">
        <DialogHeader>
          <DialogTitle>Chi tiết ngân hàng</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của ngân hàng chuyên viên.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !consultantBank ? (
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
                value={consultantBank.consultantBankId}
                readOnly
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="bank">Ngân hàng</Label>

              <Card className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={consultantBank.bank.logoUrl}
                    alt={consultantBank.bank.shortName}
                    width={60}
                    height={60}
                  />

                  <div className="flex w-full flex-col">
                    <span className="font-medium capitalize">
                      {consultantBank.bank.shortName}
                    </span>

                    <span className="text-muted-foreground text-sm">
                      {consultantBank.name}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {consultantBank.number}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(consultantBank.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(consultantBank.updatedAt)}
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

export default ConsultantBankDetailDialog
