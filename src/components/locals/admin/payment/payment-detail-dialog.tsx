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

import { getPaymentStatusMeta } from "@/constants/enum/Payment"

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
    isLoading,
    error
  } = usePaymentById(paymentId || "")

  const label = paymentData
    ? getPaymentStatusMeta(paymentData.status).label
    : ""

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
        ) : error || !paymentData ? (
          <ErrorDialog
            message={
              error
                ? (error as Error).message || "Không thể tải dữ liệu."
                : "Không có dữ liệu thanh toán."
            }
          />
        ) : (
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

            <div className="col-span-2 grid grid-cols-4 gap-x-6 gap-y-4">
              <div className="col-span-1 flex-shrink-0">
                <Avatar className="h-full w-48 rounded-md">
                  <AvatarImage src={paymentData.member.avatarUrl} />
                  <AvatarFallback>
                    {getInitials(paymentData.member.fullName)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <Label htmlFor="member.fullName">Tên người dùng</Label>
                <Input
                  id="member.fullName"
                  type="text"
                  value={paymentData.member.fullName}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="member.email">Email người dùng</Label>
                <Input
                  id="member.email"
                  type="email"
                  value={paymentData.member.email}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="member.phoneNumber">
                  Số điện thoại người dùng
                </Label>
                <Input
                  id="member.phoneNumber"
                  type="text"
                  value={paymentData.member.phoneNumber}
                  readOnly
                />
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label htmlFor="subscriptionName">Gói đăng ký</Label>
                <Input
                  id="subscriptionName"
                  type="text"
                  value={paymentData.subscriptionName}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Thanh toán</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formatCurrency(paymentData.amount)}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Input id="status" type="text" value={label} readOnly />
              </div>
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
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(paymentData.updatedAt)}
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

export default PaymentDetailDialog
