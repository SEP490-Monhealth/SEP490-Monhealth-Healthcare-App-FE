"use client"

import React from "react"

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

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import {
  UserSubscriptionStatus,
  getUserSubscriptionStatusMeta
} from "@/constants/enum/UserSubscription"

import { useUserSubscriptionById } from "@/hooks/useSubscription"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

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
          <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="userSubscriptionId">Mã đăng ký gói</Label>

              <Input
                id="userSubscriptionId"
                type="text"
                value={subscriptionData.userSubscriptionId}
                readOnly
              />
            </div>

            <div className="col-span-2 flex flex-col gap-4">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-full w-full rounded-xl">
                    <AvatarImage src={subscriptionData.member.avatarUrl} />
                    <AvatarFallback className="rounded-xl">
                      {getInitials(subscriptionData.member.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex w-full flex-col gap-x-6 gap-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="member.fullName">Họ và tên</Label>
                    <Input
                      id="member.fullName"
                      type="text"
                      value={subscriptionData.member.fullName}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="member.email">Email</Label>
                    <Input
                      id="member.email"
                      type="email"
                      value={subscriptionData.member.email}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="member.phoneNumber">Số điện thoại</Label>
                    <Input
                      id="member.phoneNumber"
                      type="text"
                      value={subscriptionData.member.phoneNumber}
                      readOnly
                    />
                  </div>
                </div>
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
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserSubscriptionDetailDialog
