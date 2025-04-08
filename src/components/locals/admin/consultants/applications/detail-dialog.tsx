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
import { Textarea } from "@/components/globals/atoms/textarea"

import ConfirmAlertDialog from "@/components/globals/molecules/confirm-alert-dialog"
import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import {
  useConsultantById,
  useRejectConsultant,
  useVerifyConsultant
} from "@/hooks/useConsultant"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

interface ApplicationDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  consultantId: string | undefined
}

type AlertType = "verify" | "reject" | null

function ApplicationDetailDialog({
  isOpen,
  onClose,
  consultantId
}: ApplicationDetailDialogProps) {
  // Lấy mutate từ hook và đổi tên thành verifyConsultant/rejectConsultant
  const { mutate: verifyConsultant } = useVerifyConsultant()
  const { mutate: rejectConsultant } = useRejectConsultant()

  const {
    data: consultantData,
    isLoading: isConsultantLoading,
    error: consultantError
  } = useConsultantById(consultantId)

  // Quản lý trạng thái confirm alert
  const [alertType, setAlertType] = useState<AlertType>(null)
  const [openAlert, setOpenAlert] = useState<boolean>(false)

  // Hàm mở confirm dialog cho verify hoặc reject
  const openConfirmDialog = (type: AlertType) => {
    setAlertType(type)
    setOpenAlert(true)
  }

  // Hàm đóng confirm dialog
  const handleCloseAlert = () => {
    setAlertType(null)
    setOpenAlert(false)
  }

  // Hàm thực hiện xác nhận hoặc từ chối sau khi người dùng nhấn confirm ở alert dialog
  const handleConfirm = () => {
    if (!consultantId || !alertType) return
    if (alertType === "verify") {
      verifyConsultant(
        { consultantId },
        {
          onSuccess: () => {
            onClose()
          },
          onError: (error) => {
            console.error("Error verifying consultant:", error)
          }
        }
      )
    } else if (alertType === "reject") {
      rejectConsultant(
        { consultantId },
        {
          onSuccess: () => {
            onClose()
          },
          onError: (error) => {
            console.error("Error rejecting consultant:", error)
          }
        }
      )
    }
    // Đóng confirm dialog sau khi thực hiện hành động
    handleCloseAlert()
  }

  const isLoading = isConsultantLoading
  const hasError = consultantError

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[700px]">
          <DialogHeader>
            <DialogTitle>Chi tiết chuyên viên</DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết của chuyên viên.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <LoadingDialog />
          ) : hasError || !consultantData ? (
            <ErrorDialog
              message={consultantError?.message || "Không thể tải dữ liệu."}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-full w-48 rounded-xl">
                    <AvatarImage src={consultantData.avatarUrl} />
                    <AvatarFallback className="rounded-xl">
                      {getInitials(consultantData.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="consultantId">Mã chuyên viên</Label>
                    <Input
                      id="consultantId"
                      type="text"
                      value={consultantData.consultantId}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Tên chuyên viên</Label>
                    <Input
                      id="name"
                      type="text"
                      value={consultantData.fullName}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={consultantData.email}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input
                      id="phoneNumber"
                      type="text"
                      value={consultantData.phoneNumber}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expertise">Chuyên môn</Label>
                  <Input
                    id="expertise"
                    type="text"
                    value={consultantData.expertise}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Kinh nghiệm</Label>
                  <div className="relative">
                    <Input
                      id="experience"
                      type="number"
                      value={consultantData.experience}
                      readOnly
                    />
                    <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm">
                      năm
                    </span>
                  </div>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="bio">Mô tả ngắn</Label>
                  <Textarea
                    id="bio"
                    rows={6}
                    value={consultantData.bio}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="createdAt">Ngày tạo</Label>
                  <Input
                    id="createdAt"
                    type="text"
                    value={formatDate(consultantData.createdAt)}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                  <Input
                    id="updatedAt"
                    type="text"
                    value={formatDate(consultantData.updatedAt || "--")}
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>

              <div className="space-x-4">
                <Button
                  variant="destructive"
                  onClick={() => openConfirmDialog("reject")}
                >
                  Từ chối
                </Button>

                <Button onClick={() => openConfirmDialog("verify")}>
                  Xác nhận
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmAlertDialog
        open={openAlert}
        onOpenChange={handleCloseAlert}
        onConfirm={handleConfirm}
        title={
          alertType === "verify"
            ? "Xác nhận chấp nhận chuyên viên"
            : "Xác nhận từ chối chuyên viên"
        }
        description={
          alertType === "verify"
            ? "Bạn có chắc chắn muốn xác nhận chuyên viên này không?"
            : "Bạn có chắc chắn muốn từ chối chuyên viên này không?"
        }
      />
    </>
  )
}

export default ApplicationDetailDialog
