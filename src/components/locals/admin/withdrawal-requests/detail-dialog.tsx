"use client"

import React, { useState } from "react"

import Image from "next/image"

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
  getWithdrawalRequestStatusMeta
} from "@/constants/enum/WithdrawalRequest"

import {
  useApproveWithdrawalRequest,
  useRejectWithdrawalRequest,
  useWithdrawalRequestById
} from "@/hooks/useWithdrawalRequest"

import { formatCurrency, formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

interface WithdrawalRequestDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  withdrawalRequestId: string | null
}

function WithdrawalRequestDetailDialog({
  isOpen,
  onClose,
  withdrawalRequestId
}: WithdrawalRequestDetailDialogProps) {
  const {
    data: withdrawalRequestData,
    isLoading: isWithdrawalRequestLoading,
    error: withdrawalRequestError
  } = useWithdrawalRequestById(withdrawalRequestId || "")

  console.log(withdrawalRequestData?.status)

  const { mutate: approveWithdrawalRequest } = useApproveWithdrawalRequest()
  const { mutate: rejectWithdrawalRequest } = useRejectWithdrawalRequest()

  const qrCodeUrl =
    "https://img.vietqr.io/image/BIDV-1890445466-compact2.png?amount=20000&addInfo=test%20rut%20tien&accountName=V%C4%83n%20H%E1%BB%AFu%20To%C3%A0n"

  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openQrCodeModal, setOpenQrCodeModal] = useState<boolean>(false)
  const [alertContent, setAlertContent] = useState<{
    title: string
    description: string
    onConfirm: () => void
  }>({
    title: "",
    description: "",
    onConfirm: () => {}
  })

  const [isApproved, setIsApproved] = useState<boolean>(false)

  const { label: withdrawalStatusLabel } = getWithdrawalRequestStatusMeta(
    withdrawalRequestData?.status || WithdrawalRequestStatusEnum.Pending
  )

  const handleOpenAlert = (action: "approve" | "reject" | "complete") => {
    if (action === "approve") {
      setAlertContent({
        title: "Xác nhận chấp nhận yêu cầu",
        description: "Bạn có chắc chắn muốn chấp nhận yêu cầu này không?",
        onConfirm: handleApprove
      })
    } else if (action === "reject") {
      setAlertContent({
        title: "Xác nhận từ chối yêu cầu",
        description: "Bạn có chắc chắn muốn từ chối yêu cầu này không?",
        onConfirm: handleReject
      })
    } else if (action === "complete") {
      setAlertContent({
        title: "Xác nhận hoàn tất thanh toán",
        description: "Bạn có chắc chắn đã hoàn tất thanh toán không?",
        onConfirm: handleCompletePayment
      })
    }

    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleApprove = () => {
    setOpenAlert(false)
    setIsApproved(true)
  }

  const handleReject = () => {
    setOpenAlert(false)
    setIsApproved(false)
    onClose()
  }

  const handleOpenQrCodeModal = async () => {
    setOpenQrCodeModal(true)
  }

  const handleCloseQrCodeModal = () => {
    setOpenQrCodeModal(false)
  }

  const handleCompletePayment = () => {
    setOpenQrCodeModal(false)
    setOpenAlert(false)
    setIsApproved(false)
    onClose()
  }

  const isLoading = isWithdrawalRequestLoading
  const hasError = withdrawalRequestError

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[700px]">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu</DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết của yêu cầu.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <LoadingDialog />
          ) : hasError || !withdrawalRequestData ? (
            <ErrorDialog
              message={
                withdrawalRequestError?.message || "Không thể tải dữ liệu."
              }
            />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-full w-48 rounded-md">
                    <AvatarImage
                      src={withdrawalRequestData.consultant.avatarUrl}
                      alt={getInitials(
                        withdrawalRequestData.consultant.fullName
                      )}
                    />
                    <AvatarFallback>
                      {getInitials(withdrawalRequestData.consultant.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="withdrawalRequestId">Mã yêu cầu</Label>
                    <Input
                      id="withdrawalRequestId"
                      type="text"
                      value={withdrawalRequestData.withdrawalRequestId}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Tên chuyên viên</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={withdrawalRequestData.consultant.fullName}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="text"
                      value={withdrawalRequestData.consultant.email}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input
                      id="phoneNumber"
                      type="text"
                      value={withdrawalRequestData.consultant.phoneNumber}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Số tiền</Label>
                  <Input
                    id="price"
                    type="text"
                    value={formatCurrency(withdrawalRequestData.amount)}
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
                    value={withdrawalRequestData.description}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="createdAt">Ngày tạo</Label>
                  <Input
                    id="createdAt"
                    type="text"
                    value={formatDate(withdrawalRequestData.createdAt)}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="createdBy">Người tạo</Label>
                  <Input
                    id="createdBy"
                    type="text"
                    value={withdrawalRequestData.createdBy || "--"}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                  <Input
                    id="updatedAt"
                    type="text"
                    value={formatDate(withdrawalRequestData.updatedAt)}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedBy">Người cập nhật</Label>
                  <Input
                    id="updatedBy"
                    type="text"
                    value={withdrawalRequestData.updatedBy || "--"}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <div className="flex w-full justify-between">
              {!isApproved ? (
                <div className="space-x-4">
                  <Button onClick={() => handleOpenAlert("approve")}>
                    Chấp nhận
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleOpenAlert("reject")}
                  >
                    Từ chối
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={handleOpenQrCodeModal}>
                  Thanh toán
                </Button>
              )}
            </div>

            <Button onClick={onClose}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={alertContent.onConfirm}
        title={alertContent.title}
        description={alertContent.description}
      />

      <Dialog open={openQrCodeModal} onOpenChange={handleCloseQrCodeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>
              Quét mã QR để hoàn tất thanh toán.
            </DialogDescription>
          </DialogHeader>

          {qrCodeUrl && (
            <div className="flex justify-center">
              <Image
                src={qrCodeUrl || ""}
                alt={withdrawalRequestData?.withdrawalRequestId || "QR Code"}
                width={384}
                height={384}
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="default"
              onClick={() => handleOpenAlert("complete")}
            >
              Hoàn thành
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default WithdrawalRequestDetailDialog
