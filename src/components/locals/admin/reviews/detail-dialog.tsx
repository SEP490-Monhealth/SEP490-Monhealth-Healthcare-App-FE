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

import { useReviewById } from "@/hooks/useReview"

import { formatDate } from "@/utils/formatters"

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

  const ratingReview = reviewData?.rating ? `${reviewData.rating}⭐` : ""

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

            <div>
              <UserInformationCard role="Member" userData={reviewData.member} />
            </div>

            <div className="grid grid-cols-6 gap-x-6 gap-y-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="rating">Đánh giá</Label>
                <Input id="rating" type="text" value={ratingReview} readOnly />
              </div>

              <div className="col-span-4 space-y-2">
                <Label htmlFor="comment">Phản hồi</Label>
                <Input
                  id="comment"
                  type="text"
                  value={reviewData.comment}
                  readOnly
                />
              </div>

              <div className="col-span-3 space-y-2">
                <Label htmlFor="createdAt">Ngày tạo</Label>
                <Input
                  id="createdAt"
                  type="text"
                  value={formatDate(reviewData.createdAt)}
                  readOnly
                />
              </div>

              <div className="col-span-3 space-y-2">
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
