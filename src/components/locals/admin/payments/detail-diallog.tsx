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
import UserInformationCard from "@/components/globals/molecules/user-information-card"

import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  getTransactionStatusMeta,
  getTransactionTypeMeta
} from "@/constants/enum/Transaction"

import { useTransactionById } from "@/hooks/useTransaction"

import { formatCurrency, formatDateTime } from "@/utils/formatters"

interface PaymentDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  transactionId: string | null
}

function PaymentDetailDialog({
  isOpen,
  onClose,
  transactionId
}: PaymentDetailDialogProps) {
  const {
    data: transactionData,
    isLoading: isTransactionLoading,
    error: transactionError
  } = useTransactionById(transactionId || "")

  const { label: transactionTypeLabel } = getTransactionTypeMeta(
    transactionData?.type || TransactionTypeEnum.Earning
  )

  const { label: transactionStatusLabel } = getTransactionStatusMeta(
    transactionData?.status || TransactionStatusEnum.Pending
  )

  const isLoading = isTransactionLoading
  const hasError = transactionError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết giao dịch</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của giao dịch.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !transactionData ? (
          <ErrorDialog
            message={transactionError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="transactionId">Mã giao dịch</Label>
              <Input
                id="transactionId"
                type="text"
                value={transactionData.transactionId}
                readOnly
              />
            </div>

            <UserInformationCard
              role="Member"
              userData={transactionData.member}
            />

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Input
                  id="description"
                  type="text"
                  value={transactionData.description}
                  readOnly
                />
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Số tiền</Label>

                  <div className="relative">
                    <Input
                      id="price"
                      type="text"
                      value={formatCurrency(transactionData.amount)}
                      readOnly
                    />
                    <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                      VND
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Loại giao dịch</Label>
                  <Input
                    id="type"
                    type="text"
                    value={transactionTypeLabel}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Input
                    id="status"
                    type="text"
                    value={transactionStatusLabel}
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="createdAt">Ngày tạo</Label>
                <Input
                  id="createdAt"
                  type="text"
                  value={formatDateTime(transactionData.createdAt)}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                <Input
                  id="updatedAt"
                  type="text"
                  value={formatDateTime(transactionData.updatedAt)}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {transactionData && (
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentDetailDialog
