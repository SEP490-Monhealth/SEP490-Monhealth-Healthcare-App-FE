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
import { Input } from "@/components/globals/atoms/input"
import { Label } from "@/components/globals/atoms/label"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  getTransactionStatusMeta,
  getTransactionTypeMeta
} from "@/constants/enum/Transaction"

import {
  useCompleteTransaction,
  useTransactionById
} from "@/hooks/useTransaction"

import { formatCurrency, formatDateTime } from "@/utils/formatters"

import QrCodeDialog from "./qr-code-dialog"

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

  const { mutate: completeTransaction } = useCompleteTransaction()

  const {
    data: transactionData,
    isLoading: isTransactionLoading,
    error: transactionError
  } = useTransactionById(transactionId || "")

  const { label: transactionTypeLabel } = getTransactionTypeMeta(
    transactionData?.type || TransactionTypeEnum.Earning
  )
  const { label: transactionStatusLabel } = getTransactionStatusMeta(
    transactionData?.status || TransactionStatusEnum.Pending
  )

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

  const isLoading = isTransactionLoading
  const hasError = transactionError

  // const validMember =
  //   transactionData?.member &&
  //   Object.values(transactionData.member).some((value) => value != null)

  // const validConsultant =
  //   transactionData?.consultant &&
  //   Object.values(transactionData.consultant).some((value) => value != null)

  // const dataInfo = validMember
  //   ? { role: "Member", userData: transactionData.member }
  //   : validConsultant
  //     ? { role: "Consultant", userData: transactionData.consultant }
  //     : null

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
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="transactionId">Mã giao dịch</Label>
                <Input
                  id="transactionId"
                  type="text"
                  value={transactionData.transactionId}
                  readOnly
                />
              </div>

              {/* {dataInfo && (
                <div>
                  <UserInformationCard
                    role={dataInfo.role}
                    userData={dataInfo.userData}
                  />
                </div>
              )} */}

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Input
                    id="description"
                    type="text"
                    value={transactionData.description}
                    readOnly
                  />
                </div>

                <div className="col-span-2 grid grid-cols-3 gap-x-6 gap-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Số tiền</Label>

                    <div className="relative">
                      <Input
                        id="price"
                        type="text"
                        value={formatCurrency(transactionData.amount)}
                        readOnly
                      />
                      <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                        VND
                      </span>
                    </div>
                  </div>

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
                    <Label htmlFor="status">Trạng thái</Label>
                    <Input
                      id="status"
                      type="text"
                      value={transactionStatusLabel}
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="createdAt">Ngày tạo</Label>
                  <Input
                    id="createdAt"
                    type="text"
                    value={formatDateTime(transactionData.createdAt)}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="createdBy">Người tạo</Label>
                  <Input
                    id="createdBy"
                    type="text"
                    value={transactionData.createdBy || "--"}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                  <Input
                    id="updatedAt"
                    type="text"
                    value={formatDateTime(transactionData.updatedAt)}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedBy">Người cập nhật</Label>
                  <Input
                    id="updatedBy"
                    type="text"
                    value={transactionData.updatedBy || "--"}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <div className="flex w-full justify-between">
              {transactionData?.status !== TransactionStatusEnum.Completed && (
                <Button variant="outline" onClick={onClose}>
                  Đóng
                </Button>
              )}

              {transactionData?.status !== TransactionStatusEnum.Completed && (
                <>
                  {(transactionData?.type === TransactionTypeEnum.Earning ||
                    transactionData?.type === TransactionTypeEnum.Bonus) && (
                    <Button onClick={handleCompleteEarning}>Hoàn thành</Button>
                  )}

                  {transactionData?.type === TransactionTypeEnum.Withdrawal && (
                    <Button onClick={handleOpenQrCodeModal}>Thanh toán</Button>
                  )}
                </>
              )}
            </div>

            {transactionData?.status === TransactionStatusEnum.Completed && (
              <Button onClick={onClose}>Đóng</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
