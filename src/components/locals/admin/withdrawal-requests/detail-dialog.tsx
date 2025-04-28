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

function WithdrawalRequestDetailDialog({
  isOpen,
  onClose,
  withdrawalRequestId
}: WithdrawalRequestDetailDialogProps) {
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [openRejectDialog, setOpenRejectDialog] = useState<boolean>(false)
  const [alertContent, setAlertContent] = useState<{
    title: string
    description: string
    onConfirm: () => void
  }>({
    title: "",
    description: "",
    onConfirm: () => {}
  })

  const { mutate: approveWithdrawalRequest } = useApproveWithdrawalRequest()
  const { mutate: rejectWithdrawalRequest } = useRejectWithdrawalRequest()

  const {
    data: withdrawalRequestData,
    isLoading: isWithdrawalRequestLoading,
    error: withdrawalRequestError
  } = useWithdrawalRequestById(withdrawalRequestId || "")

  const { label: withdrawalStatusLabel } = getWithdrawalRequestStatusMeta(
    withdrawalRequestData?.status || WithdrawalRequestStatusEnum.Pending
  )

  const handleOpenAlert = (action: "approve" | "reject") => {
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
        onConfirm: () => {
          setOpenAlert(false)
          setOpenRejectDialog(true)
        }
      })
    }

    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleApprove = () => {
    if (!withdrawalRequestId) return

    approveWithdrawalRequest(
      { withdrawalRequestId },
      {
        onSuccess: () => {
          setOpenAlert(false)
        }
      }
    )
  }

  const handleReject = (reason: string) => {
    if (!withdrawalRequestId) return

    rejectWithdrawalRequest(
      {
        withdrawalRequestId,
        reason
      },
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
        <DialogContent className="min-w-[700px]">
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu</DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết của yêu cầu.
            </DialogDescription>
          </DialogHeader>

          {isWithdrawalRequestLoading ? (
            <LoadingDialog />
          ) : withdrawalRequestError || !withdrawalRequestData ? (
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
                  id="withdrawalRequestId"
                  type="text"
                  value={withdrawalRequestData.withdrawalRequestId}
                  readOnly
                />
              </div>

              <UserInformationCard
                role="Consultant"
                userData={withdrawalRequestData.consultant}
              />

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
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
            <div className="flex w-full justify-between">
              {withdrawalRequestData &&
                withdrawalRequestData?.status !==
                  WithdrawalRequestStatusEnum.Approved && (
                  <Button variant="outline" onClick={onClose}>
                    Đóng
                  </Button>
                )}

              {withdrawalRequestData?.status ===
                WithdrawalRequestStatusEnum.Pending && (
                <div className="space-x-4">
                  <Button
                    variant="destructive"
                    onClick={() => handleOpenAlert("reject")}
                    disabled={
                      isWithdrawalRequestLoading || !withdrawalRequestData
                    }
                  >
                    Từ chối
                  </Button>

                  <Button
                    onClick={() => handleOpenAlert("approve")}
                    disabled={
                      isWithdrawalRequestLoading || !withdrawalRequestData
                    }
                  >
                    Chấp nhận
                  </Button>
                </div>
              )}
            </div>

            {withdrawalRequestData?.status ===
              WithdrawalRequestStatusEnum.Approved && (
              <Button onClick={onClose}>Đóng</Button>
            )}
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

      <RejectDialog
        isOpen={openRejectDialog}
        onClose={() => setOpenRejectDialog(false)}
        onReject={handleReject}
      />
    </>
  )
}

export default WithdrawalRequestDetailDialog
