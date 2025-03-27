import React, { useState } from "react"

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

import { useAddSubscription } from "@/hooks/useSubscription"

import {
  CreateUpdateSubscriptionType,
  createUpdateSubscriptionSchema
} from "@/schemas/subscriptionSchema"

interface AddSubscriptionDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddSubscriptionDialog({
  isOpen,
  onClose
}: AddSubscriptionDialogProps) {
  const { mutate: addSubscription } = useAddSubscription()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUpdateSubscriptionType>({
    resolver: zodResolver(createUpdateSubscriptionSchema)
  })

  const onSubmit = async (data: CreateUpdateSubscriptionType) => {
    setIsLoading(true)

    const finalData = data
    console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

    try {
      await addSubscription(finalData, {
        onSuccess: () => {
          onClose()
          reset()
        }
      })
    } catch (error) {
      console.error("Lỗi khi tạo gói đăng ký:", error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(errors)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo gói đăng ký</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo gói đăng ký mới.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="name">Tên gói đăng ký</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập tên gói đăng ký"
                {...register("name")}
              />
            </div>

            {errors.name && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả gói đăng ký</Label>
              <Textarea
                id="description"
                rows={6}
                placeholder="Nhập mô tả gói đăng ký"
                {...register("description")}
              />
            </div>

            {errors.description && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-x-6">
            <div>
              <div className="space-y-2">
                <Label htmlFor="price">Giá tiền (VND)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Nhập giá tiền đăng ký"
                  {...register("price", { valueAsNumber: true })}
                />
              </div>

              {errors.price && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="durationDays">Thời gian hiệu lực (Ngày)</Label>
                <Input
                  id="durationDays"
                  type="number"
                  placeholder="Nhập số ngày"
                  {...register("durationDays", { valueAsNumber: true })}
                />
              </div>

              {errors.durationDays && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.durationDays.message}
                </p>
              )}
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="bookingAllowance">Số lần đặt lịch</Label>
                <Input
                  id="bookingAllowance"
                  type="number"
                  placeholder="Nhập số lần"
                  {...register("bookingAllowance", { valueAsNumber: true })}
                />
              </div>

              {errors.bookingAllowance && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.bookingAllowance.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="features">Tính năng gói đăng ký</Label>
              <Textarea
                id="features"
                rows={6}
                placeholder="Nhập tính năng gói đăng ký"
                {...register("features")}
              />
            </div>

            {errors.features && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.features.message}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6 gap-4">
          <Button variant="secondary" size="lg" onClick={onClose}>
            Hủy
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? "Đang tạo..." : "Tạo gói đăng ký"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddSubscriptionDialog
