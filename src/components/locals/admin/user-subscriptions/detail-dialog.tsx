"use client"

import React from "react"

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
import UserInformationCard from "@/components/globals/molecules/user-information-card"

import {
  UserSubscriptionStatus,
  getUserSubscriptionStatusMeta
} from "@/constants/enum/UserSubscription"

import { useUserSubscriptionById } from "@/hooks/useSubscription"

import { formatDate } from "@/utils/formatters"

interface UserSubscriptionDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  userSubscriptionId: string | null
}

function UserSubscriptionDetailDialog({
  isOpen,
  onClose,
  userSubscriptionId
}: UserSubscriptionDetailDialogProps) {
  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    error: subscriptionError
  } = useUserSubscriptionById(userSubscriptionId || "")

  const { label: subscriptionStatusLabel } = getUserSubscriptionStatusMeta(
    subscriptionData?.status || UserSubscriptionStatus.Active
  )

  const isLoading = isSubscriptionLoading
  const hasError = subscriptionError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết gói đăng ký</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của gói đăng ký.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !subscriptionData ? (
          <ErrorDialog
            message={subscriptionError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="userSubscriptionId">Mã đăng ký gói</Label>

              <Input
                disabled
                id="userSubscriptionId"
                type="text"
                value={subscriptionData.userSubscriptionId}
              />
            </div>

            <div className="col-span-2 flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="">Người dùng</Label>
                <UserInformationCard
                  role="Member"
                  userData={subscriptionData.member}
                />
              </div>

              <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subscription">Gói đăng ký</Label>
                  <Input
                    id="subscription"
                    type="text"
                    value={subscriptionData.subscription}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remainingBookings">Số lần đặt lịch</Label>
                  <Input
                    id="remainingBookings"
                    type="text"
                    value={subscriptionData.remainingBookings}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Input
                    id="status"
                    type="text"
                    value={subscriptionStatusLabel}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="col-span-1 space-y-2">
              <Label htmlFor="startedAt">Ngày bắt đầu</Label>
              <Input
                id="startedAt"
                type="text"
                value={formatDate(subscriptionData.startedAt)}
                readOnly
              />
            </div>

            <div className="col-span-1 space-y-2">
              <Label htmlFor="expiresAt">Ngày kết thúc</Label>
              <Input
                id="expiresAt"
                type="text"
                value={formatDate(subscriptionData.expiresAt)}
                readOnly
              />
            </div>

            <div className="col-span-1 space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(subscriptionData.createdAt)}
                readOnly
              />
            </div>

            <div className="col-span-1 space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(subscriptionData.updatedAt)}
                readOnly
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserSubscriptionDetailDialog
