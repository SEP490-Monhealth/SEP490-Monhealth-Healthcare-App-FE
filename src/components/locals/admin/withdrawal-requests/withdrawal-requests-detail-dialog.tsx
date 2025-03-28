"use client"

import React, { useState } from "react"

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

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
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

interface TransactionWithdrawalDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  transactionId: string | null
}

function TransactionWithdrawalDetailDialog({
  isOpen,
  onClose,
  transactionId
}: TransactionWithdrawalDetailDialogProps) {
  const {
    data: transactionData,
    isLoading,
    error
  } = useTransactionById(transactionId || "")

  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [confirmAlert, setConfirmAlert] = useState<boolean>(false)
  const [dialogPayment, setDialogPayment] = useState<boolean>(false)

  const { label: transactionTypeLabel } = getTransactionTypeMeta(
    transactionData?.type || TransactionTypeEnum.Earning
  )

  const { label: transactionStatusLabel } = getTransactionStatusMeta(
    transactionData?.status || TransactionStatusEnum.Pending
  )

  const handleOpenAlert = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleOpenDialogPayment = () => {
    setDialogPayment(true)
  }

  const handleConfirm = () => {
    setOpenAlert(false)
    setConfirmAlert(true)
  }

  const handleClosePaymentDialog = () => {
    setDialogPayment(false)
  }

  const handleClose = () => {
    setConfirmAlert(false)
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
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
                <Input
                  id="description"
                  type="text"
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
            <div className="flex w-full justify-between">
              <Button
                variant={confirmAlert ? "default" : "outline"}
                onClick={
                  confirmAlert ? handleOpenDialogPayment : handleOpenAlert
                }
              >
                {confirmAlert ? "Thanh toán" : "Chấp nhận"}
              </Button>

              <Button onClick={handleClose}>Đóng</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={handleConfirm}
        title="Xác nhận thanh toán"
        description="Bạn có chắc muốn thanh toán yêu cầu rút tiền này?"
      />

      <Dialog open={dialogPayment} onOpenChange={handleClosePaymentDialog}>
        <DialogContent className="min-h-[400px] min-w-[300px]">
          <DialogHeader>
            <DialogTitle>Chi tiết thanh toán</DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết của thanh toán.
            </DialogDescription>
          </DialogHeader>
          <div>ahihih địt e đi</div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TransactionWithdrawalDetailDialog
