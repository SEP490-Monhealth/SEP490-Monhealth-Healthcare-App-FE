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

import BankInformationCard from "@/components/globals/molecules/bank-information-card"
import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"
import UserInformationCard from "@/components/globals/molecules/user-information-card"

import {
  WithdrawalRequestStatusEnum,
  getWithdrawalRequestStatusMeta
} from "@/constants/enum/WithdrawalRequest"

import {
  useApproveWithdrawalRequest,
  useRejectWithdrawalRequest,
  useWithdrawalRequestById
} from "@/hooks/useWithdrawalRequest"

import { formatCurrency, formatDateTime } from "@/utils/formatters"

import RejectDialog from "./reject-dialog"

interface WithdrawalRequestDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  withdrawalRequestId: string | null
}

type AlertType = "approve" | null

function WithdrawalRequestDetailDialog({
  isOpen,
  onClose,
  withdrawalRequestId
}: WithdrawalRequestDetailDialogProps) {
  const [alertType, setAlertType] = useState<AlertType>()
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openRejectDialog, setOpenRejectDialog] = useState<boolean>(false)

  const { mutate: approveWithdrawalRequest, isPending: isApproving } =
    useApproveWithdrawalRequest()
  const { mutate: rejectWithdrawalRequest, isPending: isRejecting } =
    useRejectWithdrawalRequest()

  const {
    data: withdrawalRequestData,
    isLoading: isWithdrawalRequestLoading,
    error: withdrawalRequestError
  } = useWithdrawalRequestById(withdrawalRequestId || "")

  const isProcessing = isApproving || isRejecting

  const { label: withdrawalStatusLabel } = getWithdrawalRequestStatusMeta(
    withdrawalRequestData?.status || WithdrawalRequestStatusEnum.Pending
  )

  const consultantBankInfoCard = {
    ...withdrawalRequestData?.consultantBank,
    bank: withdrawalRequestData?.bank
  }

  const openConfirmDialog = (type: AlertType) => {
    setAlertType(type)
    setOpenAlert(true)
  }

  const handleOpenRejectDialog = () => {
    setOpenRejectDialog(true)
  }

  const handleCloseAlert = () => {
    setAlertType(null)
    setOpenAlert(false)
  }

  const handleConfirm = () => {
    if (!withdrawalRequestId || !alertType) return

    if (alertType === "approve") {
      approveWithdrawalRequest(
        { withdrawalRequestId },
        {
          onSuccess: () => {
            onClose()
          }
        }
      )
    }

    handleCloseAlert()
  }

  const handleRejectWithdrawal = (reason: string) => {
    if (!withdrawalRequestId) return

    rejectWithdrawalRequest(
      { withdrawalRequestId, reason },
      {
        onSuccess: () => {
          onClose()
        }
      }
    )
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
              <div className="space-y-2">
                <Label htmlFor="withdrawalRequestId">Mã yêu cầu</Label>
                <Input
                  disabled
                  id="withdrawalRequestId"
                  type="text"
                  value={withdrawalRequestData.withdrawalRequestId}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="">Chuyên viên</Label>
                <UserInformationCard
                  role="Consultant"
                  userData={withdrawalRequestData.consultant}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank">Ngân hàng</Label>
                <BankInformationCard
                  // @ts-expect-error thua
                  consultantBankData={consultantBankInfoCard}
                />
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
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
                  <Label htmlFor="price">Số tiền</Label>

                  <div className="relative">
                    <Input
                      id="price"
                      type="text"
                      value={formatCurrency(withdrawalRequestData.amount)}
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
                    value={withdrawalStatusLabel}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="createdAt">Ngày tạo</Label>
                  <Input
                    id="createdAt"
                    type="text"
                    value={formatDateTime(withdrawalRequestData.createdAt)}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                  <Input
                    id="updatedAt"
                    type="text"
                    value={formatDateTime(withdrawalRequestData.updatedAt)}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <div
              className={`flex w-full ${withdrawalRequestData?.status === WithdrawalRequestStatusEnum.Pending ? "justify-between" : "justify-end"}`}
            >
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>

              {withdrawalRequestData?.status ===
                WithdrawalRequestStatusEnum.Pending && (
                <div className="space-x-4">
                  <Button
                    disabled={isProcessing}
                    variant="destructive"
                    onClick={handleOpenRejectDialog}
                  >
                    {isRejecting ? "Đang từ chối..." : "Từ chối"}
                  </Button>

                  <Button
                    disabled={isProcessing}
                    onClick={() => openConfirmDialog("approve")}
                  >
                    {isApproving ? "Đang chấp nhận..." : "Chấp nhận"}
                  </Button>
                </div>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={handleConfirm}
        title="Chấp nhận yêu cầu"
        description="Bạn có chắc chắn muốn chấp nhận yêu cầu này?"
      />

      <RejectDialog
        isOpen={openRejectDialog}
        onClose={() => setOpenRejectDialog(false)}
        onReject={handleRejectWithdrawal}
        isSubmitting={isRejecting}
      />
    </>
  )
}

export default WithdrawalRequestDetailDialog
