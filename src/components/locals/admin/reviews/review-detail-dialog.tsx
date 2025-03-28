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

  const ratingReview = reviewData?.rating ? `${reviewData.rating} ⭐` : ""

  const isLoading = isReviewLoading
  const hasError = reviewError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
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
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-1 space-y-2">
              <Label htmlFor="reviewId">Mã đánh giá</Label>
              <Input
                id="reviewId"
                type="text"
                value={reviewData.reviewId}
                readOnly
              />
            </div>

            <div className="col-span-1 space-y-2">
              <Label htmlFor="bookingId">Mã lịch hẹn</Label>
              <Input
                id="bookingId"
                type="text"
                value={reviewData.bookingId}
                readOnly
              />
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-6">
              <div className="flex-shrink-0">
                <Avatar className="h-full w-48 rounded-md">
                  <AvatarImage src={reviewData.member.avatarUrl} />
                  <AvatarFallback>
                    {getInitials(reviewData.member.fullName)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="col-span-2 space-y-4">
                <div className="col-span-2 grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên thành viên</Label>
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
                </div>

                <div className="col-span-2 grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input
                      id="phoneNumber"
                      type="number"
                      value={reviewData.member.phoneNumber}
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">Đánh giá</Label>
                    <Input
                      id="rating"
                      type="text"
                      value={ratingReview}
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Phản hồi</Label>
                  <Input
                    id="comment"
                    type="text"
                    value={reviewData.comment}
                    readOnly
                  />
                </div>
              </div>
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
        )}

        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDetailDialog
