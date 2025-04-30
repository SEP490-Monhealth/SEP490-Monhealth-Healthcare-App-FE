"use client"

import React, { useState } from "react"

import { Button } from "@/components/globals/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/globals/atoms/dialog"
import { ScrollArea } from "@/components/globals/atoms/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/globals/atoms/tabs"

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import {
  TransactionStatusEnum,
  TransactionTypeEnum
} from "@/constants/enum/Transaction"

import { useBookingById } from "@/hooks/useBooking"
import {
  useCompleteTransaction,
  useTransactionById
} from "@/hooks/useTransaction"

import BookingTabDialog from "./booking-tab-dialog"
import QrCodeDialog from "./qr-code-dialog"
import TransactionTabDialog from "./transaction-tab-dialog"

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
  const [openQrCodeModal, setOpenQrCodeModal] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  const { mutate: completeTransaction } = useCompleteTransaction()

  const {
    data: transactionData,
    isLoading: isTransactionLoading,
    error: transactionError
  } = useTransactionById(transactionId || "")

  const {
    data: bookingData,
    isLoading: isBookingLoading,
    error: bookingError
  } = useBookingById(transactionData?.bookingId || "")

  const handleCompleteEarning = async () => {
    await completeTransaction({
      transactionId: transactionData?.transactionId || ""
    })
  }

  const handleOpenQrCodeModal = () => {
    setOpenQrCodeModal(true)
  }

  const handleCloseQrCodeModal = () => {
    setOpenQrCodeModal(false)
  }

  const handleOpenAlert = () => {
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const isLoading = isTransactionLoading || isBookingLoading
  const hasError = transactionError || bookingError

  return (
    <>
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
            <Tabs defaultValue="transaction-detail">
              <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="transaction-detail"
                  className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Thông tin
                </TabsTrigger>

                {transactionData.type === TransactionTypeEnum.Earning && (
                  <TabsTrigger
                    value="booking-detail"
                    className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Lịch hẹn
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="transaction-detail" className="mt-2 w-full">
                <ScrollArea className="h-[55vh] overflow-hidden pr-4">
                  <TransactionTabDialog transactionData={transactionData} />
                </ScrollArea>
              </TabsContent>

              {transactionData.type === TransactionTypeEnum.Earning && (
                <TabsContent value="booking-detail" className="mt-2 w-full">
                  <ScrollArea className="h-[55vh] overflow-hidden pr-4">
                    {bookingData && (
                      <BookingTabDialog bookingData={bookingData} />
                    )}
                  </ScrollArea>
                </TabsContent>
              )}
            </Tabs>
          )}

          <DialogFooter>
            {transactionData?.status === TransactionStatusEnum.Pending && (
              <div className="flex w-full justify-between">
                <Button variant="outline" onClick={onClose}>
                  Đóng
                </Button>

                {(transactionData?.type === TransactionTypeEnum.Earning ||
                  transactionData?.type === TransactionTypeEnum.Bonus) && (
                  <Button onClick={handleOpenAlert}>Hoàn thành</Button>
                )}

                {transactionData?.type === TransactionTypeEnum.Withdrawal && (
                  <Button onClick={handleOpenQrCodeModal}>Thanh toán</Button>
                )}
              </div>
            )}

            {transactionData?.status != TransactionStatusEnum.Pending && (
              <Button variant="default" onClick={onClose}>
                Đóng
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={handleCompleteEarning}
        title="Xác nhận chấp nhận lịch hẹn"
        description={`${bookingData?.isReviewed ? "Bạn có muốn chấp nhận " : "Lịch hẹn này chưa được đánh giá. Bạn có muốn chấp nhận"} lịch hẹn này không?`}
      />

      {transactionId && (
        <QrCodeDialog
          isOpen={openQrCodeModal}
          onClose={handleCloseQrCodeModal}
          transactionId={transactionId}
        />
      )}
    </>
  )
}

export default TransactionDetailDialog
