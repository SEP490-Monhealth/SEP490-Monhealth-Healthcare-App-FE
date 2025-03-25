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
import { Textarea } from "@/components/globals/atoms/textarea"

import ErrorDialog from "@/components/globals/molecules/error-dialog"
import LoadingDialog from "@/components/globals/molecules/loading-dialog"

import { useConsultantById } from "@/hooks/useConsultant"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

interface ConsultantDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  consultantId: string | null
}

function ConsultantDetailDialog({
  isOpen,
  onClose,
  consultantId
}: ConsultantDetailDialogProps) {
  const {
    data: consultantData,
    isLoading,
    error
  } = useConsultantById(consultantId || "")

  console.log(consultantData)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[520px] min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết chuyên viên</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của chuyên viên.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : error || !consultantData ? (
          <ErrorDialog
            message={
              error
                ? (error as Error).message || "Không thể tải dữ liệu."
                : "Không có dữ liệu chuyên viên."
            }
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <Avatar className="h-full w-full rounded-md">
                  <AvatarImage src={consultantData.avatarUrl} />
                  <AvatarFallback>
                    {getInitials(consultantData.fullName)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="consultantId">Mã chuyên viên</Label>
                  <Input
                    id="consultantId"
                    type="text"
                    value={consultantData.consultantId}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={consultantData.email}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expertise">Chuyên môn</Label>
                  <Input
                    id="expertise"
                    type="text"
                    value={consultantData.expertise}
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên chuyên viên</Label>
                  <Input
                    id="name"
                    type="text"
                    value={consultantData.fullName}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={consultantData.phoneNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Kinh nghiệm (năm)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={consultantData.experience}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="bio">Mô tả</Label>
                <Textarea
                  id="bio"
                  rows={6}
                  value={consultantData.bio}
                  disabled
                />
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bookingCount">Số lần đặt lịch</Label>
                  <Input
                    id="bookingCount"
                    type="number"
                    value={consultantData.bookingCount}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ratingCount">Số lượt đánh giá</Label>
                  <Input
                    id="ratingCount"
                    type="number"
                    value={consultantData.ratingCount}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="averageRating">Đánh giá trung bình</Label>
                  <Input
                    id="averageRating"
                    type="number"
                    value={consultantData.averageRating}
                    disabled
                  />
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Input
                    id="status"
                    type="text"
                    value={
                      consultantData.status ? "Hoạt động" : "Ngừng hoạt động"
                    }
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isVerified">Xác thực</Label>
                  <Input
                    id="isVerified"
                    type="text"
                    value={
                      consultantData.isVerified ? "Xác thực" : "Chưa xác thực"
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="createdAt">Ngày tạo</Label>
                <Input
                  id="createdAt"
                  type="text"
                  value={formatDate(consultantData.createdAt)}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                <Input
                  id="updatedAt"
                  type="text"
                  value={formatDate(consultantData.updatedAt)}
                  disabled
                />
              </div>
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

export default ConsultantDetailDialog
