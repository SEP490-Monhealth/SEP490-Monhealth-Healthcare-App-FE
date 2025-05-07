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
  useCompleteTransaction,
  useTransactionQrCodeById
} from "@/hooks/useTransaction"

interface QrCodeDialogProps {
  isOpen: boolean
  onClose: () => void
  transactionId: string | null
}

function QrCodeDialog({ isOpen, onClose, transactionId }: QrCodeDialogProps) {
  const [openConfirmComplete, setOpenConfirmComplete] = useState<boolean>(false)

  const { mutate: completeTransaction, isPending: isCompleting } =
    useCompleteTransaction()

  const {
    data: qrCodeData,
    isLoading: isQrCodeLoading,
    error: qrCodeError
  } = useTransactionQrCodeById(isOpen && transactionId ? transactionId : "")

  const handleOpenConfirmComplete = () => {
    setOpenConfirmComplete(true)
  }

  const handleCloseConfirmComplete = () => {
    setOpenConfirmComplete(false)
  }

  const handleCompletePayment = () => {
    if (!transactionId) return

    completeTransaction(
      { transactionId },
      {
        onSuccess: () => {
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
                alt={transactionId || "QR Code"}
                width={384}
                height={384}
              />
            </div>
          ) : (
            <div className="py-4 text-center">Không có dữ liệu QR code</div>
          )}

          <DialogFooter>
            <Button disabled={isCompleting} onClick={handleOpenConfirmComplete}>
              {isCompleting ? "Đang hoàn thành..." : "Hoàn thành"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmAlertDialog
        open={openConfirmComplete}
        onOpenChange={handleCloseConfirmComplete}
        onConfirm={handleCompletePayment}
        title="Xác nhận hoàn thành"
        description="Bạn có chắc chắn đã hoàn thành thanh toán giao dịch này"
      />
    </>
  )
}

export default QrCodeDialog
