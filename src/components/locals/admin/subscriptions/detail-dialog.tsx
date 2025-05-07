"use client"

import React, { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

import {
  useSubscriptionById,
  useUpdateSubscription
} from "@/hooks/useSubscription"

import {
  CreateUpdateSubscriptionType,
  createUpdateSubscriptionSchema
} from "@/schemas/subscriptionSchema"

import { formatCurrency, formatDate } from "@/utils/formatters"

interface SubscriptionDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  subscriptionId: string | null
}

function SubscriptionDetailDialog({
  isOpen,
  onClose,
  subscriptionId
}: SubscriptionDetailDialogProps) {
  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    error: subscriptionError
  } = useSubscriptionById(subscriptionId || "")

  const { mutate: updateSubscription } = useUpdateSubscription()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUpdateSubscriptionType>({
    resolver: zodResolver(createUpdateSubscriptionSchema)
  })

  useEffect(() => {
    if (subscriptionData) {
      setValue("name", subscriptionData.name)
      setValue("description", subscriptionData.description)
      setValue("price", subscriptionData.price)
      setValue("durationDays", subscriptionData.durationDays)
      setValue("features", subscriptionData.features)
      setValue("bookingAllowance", subscriptionData.bookingAllowance)
    }
  }, [subscriptionData, setValue])

  const onSubmit = async (data: CreateUpdateSubscriptionType) => {
    setIsEdit(false)
    setIsLoadingSave(true)

    const finalData = data
    // console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

    try {
      await updateSubscription(
        { subscriptionId: subscriptionId || "", updatedData: finalData },
        {
          onSuccess: () => {
            setIsEdit(false)
            setIsLoadingSave(false)
          }
        }
      )
    } catch (error) {
      console.error("Lỗi khi cập nhật gói đăng ký:", error)
      setIsLoadingSave(false)
    }
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
  }

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
            <div className="space-y-2">
              <Label htmlFor="subscriptionId">Mã gói đăng ký</Label>
              <Input
                disabled
                id="subscriptionId"
                type="text"
                value={subscriptionData.subscriptionId}
              />
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="name">Tên gói đăng ký</Label>

                {!isEdit ? (
                  <Input
                    id="name"
                    type="text"
                    value={subscriptionData.name}
                    readOnly
                  />
                ) : (
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập tên gói đăng ký"
                    defaultValue={subscriptionData.name}
                    {...register("name")}
                  />
                )}
              </div>

              {errors.name && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Mô tả</Label>

              {!isEdit ? (
                <Input
                  id="description"
                  type="text"
                  value={subscriptionData.description}
                  readOnly
                />
              ) : (
                <Input
                  id="description"
                  type="text"
                  placeholder="Nhập mô tả gói đăng ký"
                  defaultValue={subscriptionData.description}
                  {...register("description")}
                />
              )}

              {errors.description && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="features">Tính năng</Label>

              {!isEdit ? (
                <Textarea
                  id="features"
                  rows={6}
                  value={subscriptionData.features}
                  readOnly
                />
              ) : (
                <Textarea
                  id="features"
                  rows={6}
                  placeholder="Nhập tính năng gói đăng ký"
                  defaultValue={subscriptionData.features}
                  {...register("features")}
                />
              )}

              {errors.features && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.features.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Giá</Label>

              <div className="relative">
                {!isEdit ? (
                  <Input
                    id="price"
                    type="text"
                    value={formatCurrency(subscriptionData.price)}
                    readOnly
                  />
                ) : (
                  <Input
                    id="price"
                    type="number"
                    placeholder="Nhập giá gói đăng ký"
                    defaultValue={subscriptionData.price}
                    {...register("price", { valueAsNumber: true })}
                  />
                )}
                <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                  VND
                </span>
              </div>

              {errors.price && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="durationDays">Thời gian hiệu lực</Label>

              <div className="relative">
                {!isEdit ? (
                  <Input
                    id="durationDays"
                    type="text"
                    value={subscriptionData.durationDays}
                    readOnly
                  />
                ) : (
                  <Input
                    id="durationDays"
                    type="number"
                    placeholder="Nhập thời gian hiệu lực"
                    defaultValue={subscriptionData.durationDays}
                    {...register("durationDays", { valueAsNumber: true })}
                  />
                )}
                <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                  ngày
                </span>
              </div>

              {errors.durationDays && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.durationDays.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookingAllowance">Số lần đặt lịch</Label>

              {!isEdit ? (
                <Input
                  id="bookingAllowance"
                  type="text"
                  value={subscriptionData.bookingAllowance}
                  readOnly
                />
              ) : (
                <Input
                  id="bookingAllowance"
                  type="number"
                  placeholder="Nhập số lần đặt lịch"
                  defaultValue={subscriptionData.bookingAllowance}
                  {...register("bookingAllowance", { valueAsNumber: true })}
                />
              )}

              {errors.bookingAllowance && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.bookingAllowance.message}
                </p>
              )}
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Input
                  id="status"
                  type="text"
                  value={
                    subscriptionData.status ? "Hoạt động" : "Ngừng hoạt động"
                  }
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(subscriptionData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={subscriptionData.createdBy || "--"}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(subscriptionData.updatedAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={subscriptionData.updatedBy || "--"}
                readOnly
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>

            {!isEdit ? (
              <Button onClick={handleEdit}>Chỉnh sửa</Button>
            ) : (
              <div className="space-x-4">
                <Button
                  disabled={isLoadingSave}
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Hủy
                </Button>

                <Button
                  type="submit"
                  disabled={isLoadingSave}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isLoadingSave ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionDetailDialog
