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

import { BookingStatusEnum } from "@/constants/enum/Booking"
import {
  TransactionStatusEnum,
  TransactionTypeEnum
} from "@/constants/enum/Transaction"

import { useBookingById } from "@/hooks/useBooking"
import {
  useCompleteTransaction,
  useFailTransaction,
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

type AlertType = "complete" | "fail" | null

function TransactionDetailDialog({
  isOpen,
  onClose,
  transactionId
}: TransactionDetailDialogProps) {
  const [alertType, setAlertType] = useState<AlertType>()
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openQrCodeModal, setOpenQrCodeModal] = useState<boolean>(false)

  const { mutate: completeTransaction, isPending: isCompleting } =
    useCompleteTransaction()
  const { mutate: failTransaction, isPending: isFailing } = useFailTransaction()

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

  const isProcessing = isCompleting || isFailing

  const handleCompleteTransactionEarning = async () => {
    await completeTransaction(
      {
        transactionId: transactionData?.transactionId || ""
      },
      {
        onSuccess: () => {
          onClose()
        }
      }
    )
  }

  const handleFailTransactionEarning = async () => {
    await failTransaction(
      {
        transactionId: transactionData?.transactionId || ""
      },
      {
        onSuccess: () => {
          onClose()
        }
      }
    )
  }

  const handleOpenQrCodeModal = () => {
    setOpenQrCodeModal(true)
  }

  const handleCloseQrCodeModal = () => {
    setOpenQrCodeModal(false)
  }

  const handleOpenAlert = (type: AlertType) => {
    setAlertType(type)
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setAlertType(undefined)
    setOpenAlert(false)
  }

  const isLoading = isTransactionLoading || isBookingLoading
  const hasError = transactionError || bookingError

  const titleDialog =
    alertType === "complete"
      ? "Xác nhận hoàn thành giao dịch"
      : "Xác nhận từ chối giao dịch"

  const descriptionDialog =
    alertType === "complete"
      ? (() => {
          if (bookingData?.status === BookingStatusEnum.Reported) {
            return "Lịch hẹn này đã bị báo cáo. Bạn có chắc chắn muốn hoàn thành giao dịch này?"
          }
          if (bookingData?.isReviewed) {
            return "Bạn có chắc chắn muốn hoàn thành giao dịch này?"
          }
          return "Lịch hẹn này chưa được đánh giá. Bạn có chắc chắn muốn hoàn thành giao dịch này?"
        })()
      : "Bạn có chắc chắn muốn từ chối giao dịch này?"

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
          ) : transactionData.type === TransactionTypeEnum.Earning ? (
            <Tabs defaultValue="transaction-detail">
              <TabsList className="h-auto w-full rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="transaction-detail"
                  className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Thông tin
                </TabsTrigger>

                <TabsTrigger
                  value="transaction-booking"
                  className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Lịch hẹn
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transaction-detail" className="mt-2 w-full">
                <ScrollArea className="h-[55vh] overflow-hidden pr-4">
                  <TransactionTabDialog transactionData={transactionData} />
                </ScrollArea>
              </TabsContent>

              <TabsContent value="transaction-booking" className="mt-2 w-full">
                <ScrollArea className="h-[55vh] overflow-hidden pr-4">
                  {bookingData && (
                    <BookingTabDialog bookingData={bookingData} />
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          ) : (
            <ScrollArea className="h-[55vh] overflow-hidden pr-4">
              <TransactionTabDialog transactionData={transactionData} />
            </ScrollArea>
          )}

          <DialogFooter>
            {transactionData?.status === TransactionStatusEnum.Pending && (
              <div className="flex w-full justify-between">
                <Button variant="outline" onClick={onClose}>
                  Đóng
                </Button>

                {transactionData.type === TransactionTypeEnum.Earning && (
                  <div className="space-x-4">
                    <Button
                      disabled={isProcessing}
                      variant="destructive"
                      onClick={() => handleOpenAlert("fail")}
                    >
                      {isFailing ? "Đang từ chối..." : "Từ chối"}
                    </Button>
                    <Button
                      disabled={isProcessing}
                      onClick={() => handleOpenAlert("complete")}
                    >
                      {isCompleting ? "Đang hoàn thành..." : "Hoàn thành"}
                    </Button>
                  </div>
                )}

                {transactionData?.type === TransactionTypeEnum.Bonus && (
                  <Button
                    disabled={isProcessing}
                    onClick={() => handleOpenAlert("complete")}
                  >
                    {isCompleting ? "Đang hoàn thành..." : "Hoàn thành"}
                  </Button>
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
        onConfirm={
          alertType === "complete"
            ? handleCompleteTransactionEarning
            : handleFailTransactionEarning
        }
        title={titleDialog}
        description={descriptionDialog}
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
