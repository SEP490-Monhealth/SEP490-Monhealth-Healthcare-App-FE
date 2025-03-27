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

import { useReviewById } from "@/hooks/useReview"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

interface ReviewDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  reviewId: string | null
}

function ReviewDetailDialog({
  isOpen,
  onClose,
  reviewId
}: ReviewDetailDialogProps) {
  const {
    data: reviewData,
    isLoading: isReviewLoading,
    error: reviewError
  } = useReviewById(reviewId || "")

  const isLoading = isReviewLoading
  const hasError = reviewError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-h-[520px] min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đánh giá</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của đánh giá.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !reviewData ? (
          <ErrorDialog
            message={reviewError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="reviewId">Mã đánh giá</Label>
              <Input
                id="reviewId"
                type="text"
                value={reviewData.reviewId}
                readOnly
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex-shrink-0">
                <Avatar className="h-full w-48 rounded-md">
                  <AvatarImage src={reviewData.member.avatarUrl} />
                  <AvatarFallback>
                    {getInitials(reviewData.member.fullName)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Tên chuyên viên</Label>
                <Input
                  id="name"
                  type="text"
                  value={reviewData.member.fullName}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={reviewData.member.email}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  value={reviewData.member.phoneNumber}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                <Input
                  id="updatedAt"
                  type="text"
                  value={formatDate(reviewData.updatedAt)}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="updatedAt">Ngày cập nhật</Label>
                <Input
                  id="updatedAt"
                  type="text"
                  value={formatDate(reviewData.updatedAt)}
                  readOnly
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

export default ReviewDetailDialog
