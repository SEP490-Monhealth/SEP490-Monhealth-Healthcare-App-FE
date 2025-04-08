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

import {
  PaymentStatusEnum,
  getPaymentStatusMeta
} from "@/constants/enum/Payment"

import { usePaymentById } from "@/hooks/usePayment"

import { formatCurrency, formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

interface PaymentDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  paymentId: string | null
}

function PaymentDetailDialog({
  isOpen,
  onClose,
  paymentId
}: PaymentDetailDialogProps) {
  const {
    data: paymentData,
    isLoading: isPaymentLoading,
    error: paymentError
  } = usePaymentById(paymentId || "")

  const { label: paymentStatusLabel } = getPaymentStatusMeta(
    paymentData?.status || PaymentStatusEnum.Pending
  )

  const isLoading = isPaymentLoading
  const hasError = paymentError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết thanh toán</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của thanh toán.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !paymentData ? (
          <ErrorDialog
            message={paymentError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <Avatar className="h-full w-48 rounded-xl">
                  <AvatarImage
                    src={paymentData.member.avatarUrl}
                    alt={getInitials(paymentData.member.fullName)}
                  />
                  <AvatarFallback className="rounded-xl">
                    {getInitials(paymentData.member.fullName)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="paymentId">Mã thanh toán</Label>
                  <Input
                    id="paymentId"
                    type="text"
                    value={paymentData.paymentId}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subscription">Gói đăng ký</Label>
                  <Input
                    id="type"
                    type="text"
                    value={paymentData.subscription}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ tên</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={paymentData.member.fullName}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    value={paymentData.member.email}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={paymentData.member.phoneNumber}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Input
                  id="description"
                  type="text"
                  value={paymentData.description}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Số tiền</Label>

                <div className="relative">
                  <Input
                    id="price"
                    type="text"
                    value={formatCurrency(paymentData.amount)}
                    readOnly
                  />
                  <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                    VND
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Input
                  id="status"
                  type="text"
                  value={paymentStatusLabel}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="createdAt">Ngày tạo</Label>
                <Input
                  id="createdAt"
                  type="text"
                  value={formatDate(paymentData.createdAt)}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="createdBy">Người tạo</Label>
                <Input
                  id="createdBy"
                  type="text"
                  value={paymentData.createdBy || "--"}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                <Input
                  id="updatedAt"
                  type="text"
                  value={formatDate(paymentData.updatedAt)}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updatedBy">Người cập nhật</Label>
                <Input
                  id="updatedBy"
                  type="text"
                  value={paymentData.updatedBy || "--"}
                  readOnly
                />
              </div>
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

export default PaymentDetailDialog
