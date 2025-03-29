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
  WithdrawalRequestStatusEnum,
  getPaymentStatusMeta
} from "@/constants/enum/WithdrawalRequest"

import { useWithdrawalRequestById } from "@/hooks/useWithdrawalRequest"

import { formatCurrency, formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

interface TransactionWithdrawalDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  withdrawalRequestId: string | null
}

function TransactionWithdrawalDetailDialog({
  isOpen,
  onClose,
  withdrawalRequestId
}: TransactionWithdrawalDetailDialogProps) {
  const {
    data: withdrawalData,
    isLoading: isTransactionLoading,
    error: transactionError
  } = useWithdrawalRequestById(withdrawalRequestId || "")

  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [confirmAlert, setConfirmAlert] = useState<boolean>(false)
  const [dialogPayment, setDialogPayment] = useState<boolean>(false)

  const { label: withdrawalStatusLabel } = getPaymentStatusMeta(
    withdrawalData?.status || WithdrawalRequestStatusEnum.Pending
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

  const isLoading = isTransactionLoading
  const hasError = transactionError

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="min-w-[700px]">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu</DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết của yêu cầu.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <LoadingDialog />
          ) : hasError || !withdrawalData ? (
            <ErrorDialog
              message={transactionError?.message || "Không thể tải dữ liệu."}
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="withdrawalRequestId">Mã yêu cầu</Label>
                <Input
                  id="withdrawalRequestId"
                  type="text"
                  value={withdrawalData.withdrawalRequestId}
                  readOnly
                />
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
                <div className="col-span-1">
                  <div className="flex-shrink-0">
                    <Avatar className="h-full w-48 rounded-md">
                      <AvatarImage src={withdrawalData.consultant.avatarUrl} />
                      <AvatarFallback>
                        {getInitials(withdrawalData.consultant.fullName)}
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
                      value={withdrawalData.consultant.fullName}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="text"
                      value={withdrawalData.consultant.email}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input
                      id="phoneNumber"
                      type="text"
                      value={withdrawalData.consultant.phoneNumber}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Số tiền</Label>
                <Input
                  id="price"
                  type="text"
                  value={formatCurrency(withdrawalData.amount)}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Input
                  id="status"
                  type="text"
                  value={withdrawalStatusLabel}
                  readOnly
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Input
                  id="description"
                  type="text"
                  value={withdrawalData.description}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="createdAt">Ngày tạo</Label>
                <Input
                  id="createdAt"
                  type="text"
                  value={formatDate(withdrawalData.createdAt)}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="createdBy">Người tạo</Label>
                <Input
                  id="createdBy"
                  type="text"
                  value={withdrawalData.createdBy}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                <Input
                  id="updatedAt"
                  type="text"
                  value={formatDate(withdrawalData.updatedAt)}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updatedBy">Người cập nhật</Label>
                <Input
                  id="updatedBy"
                  type="text"
                  value={withdrawalData.updatedBy}
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
