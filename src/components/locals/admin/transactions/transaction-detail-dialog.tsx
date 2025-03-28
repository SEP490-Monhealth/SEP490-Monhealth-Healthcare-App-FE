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
import { Textarea } from "@/components/globals/atoms/textarea"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  getTransactionStatusMeta,
  getTransactionTypeMeta
} from "@/constants/enum/Transaction"

import { useTransactionById } from "@/hooks/useTransaction"

import { formatCurrency, formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

interface TransactionDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  transactionId: string | null
}

function TransactionDetailDialog({
  isOpen,
  onClose,
  transactionId
}: TransactionDetailDialogProps) {
  const {
    data: transactionData,
    isLoading,
    error
  } = useTransactionById(transactionId || "")

  const { label: transactionTypeLabel } = getTransactionTypeMeta(
    transactionData?.type || TransactionTypeEnum.Earning
  )

  const { label: transactionStatusLabel } = getTransactionStatusMeta(
    transactionData?.status || TransactionStatusEnum.Pending
  )

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
        ) : error || !transactionData ? (
          <ErrorDialog
            message={
              error
                ? (error as Error).message || "Không thể tải dữ liệu."
                : "Không có dữ liệu giao dịch."
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="transactionId">Mã giao dịch</Label>
              <Input
                id="transactionId"
                type="text"
                value={transactionData.transactionId}
                readOnly
              />
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
              <div className="col-span-1">
                <div className="flex-shrink-0">
                  <Avatar className="h-full w-48 rounded-md">
                    <AvatarImage src={transactionData.consultant.avatarUrl} />
                    <AvatarFallback>
                      {getInitials(transactionData.consultant.fullName)}
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
                    value={transactionData.consultant.fullName}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    value={transactionData.consultant.email}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={transactionData.consultant.phoneNumber}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
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
                <Label htmlFor="price">Số tiền</Label>
                <Input
                  id="price"
                  type="text"
                  value={formatCurrency(transactionData.amount)}
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

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                rows={4}
                value={transactionData.description}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(transactionData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={transactionData.createdBy}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(transactionData.updatedAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={transactionData.updatedBy}
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

export default TransactionDetailDialog
