"use client"

import React, { useState } from "react"

import Image from "next/image"

import { Button } from "@/components/globals/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import {
  useWithdrawalRequestQrCodeById,
  useWithdrawalRequestStatus
} from "@/hooks/useWithdrawalRequest"

interface QrCodeDialogProps {
  isOpen: boolean
  onClose: () => void
  withdrawalRequestId: string
}

function QrCodeDialog({
  isOpen,
  onClose,
  withdrawalRequestId
}: QrCodeDialogProps) {
  const [openConfirmComplete, setOpenConfirmComplete] = useState<boolean>(false)

  const { mutate: completeWithdrawalRequest } = useWithdrawalRequestStatus()

  const {
    data: qrCodeData,
    isLoading: isQrCodeLoading,
    error: qrCodeError
  } = useWithdrawalRequestQrCodeById(isOpen ? withdrawalRequestId : "")

  const handleOpenConfirmComplete = () => {
    setOpenConfirmComplete(true)
  }

  const handleCloseConfirmComplete = () => {
    setOpenConfirmComplete(false)
  }

  const handleCompletePayment = () => {
    completeWithdrawalRequest(
      { withdrawalRequestId },
      {
        onSuccess: () => {
          setOpenConfirmComplete(false)
          onClose()
        }
      }
    )
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>
              Quét mã QR để hoàn tất thanh toán.
            </DialogDescription>
          </DialogHeader>

          {isQrCodeLoading ? (
            <LoadingDialog />
          ) : qrCodeError ? (
            <ErrorDialog message="Không thể tải mã QR. Vui lòng thử lại sau." />
          ) : qrCodeData ? (
            <div className="flex justify-center">
              <Image
                src={qrCodeData.qrCodeUrl}
                alt={withdrawalRequestId || "QR Code"}
                width={384}
                height={384}
              />
            </div>
          ) : (
            <div className="py-4 text-center">Không có dữ liệu QR code</div>
          )}

          <DialogFooter>
            <Button
              variant="default"
              onClick={handleOpenConfirmComplete}
              disabled={isQrCodeLoading || !qrCodeData}
            >
              Hoàn thành
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmAlertDialog
        open={openConfirmComplete}
        onOpenChange={handleCloseConfirmComplete}
        onConfirm={handleCompletePayment}
        title="Xác nhận hoàn tất thanh toán"
        description="Bạn có chắc chắn đã hoàn tất thanh toán không?"
      />
    </>
  )
}

export default QrCodeDialog
