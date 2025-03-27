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
  CreateSubscriptionType,
  createSubscriptionSchema
} from "@/schemas/subscriptionSchema"

interface AddExerciseDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddSubscriptionDialog({ isOpen, onClose }: AddExerciseDialogProps) {
  const { mutate: addSubscription } = useAddSubscription()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateSubscriptionType>({
    resolver: zodResolver(createSubscriptionSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      durationDays: 0,
      features: [],
      bookingAllowance: 0,
      status: false
    }
  })

  const onSubmit = async (data: CreateSubscriptionType) => {
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
      console.error("Lỗi khi tạo gói đăng kí:", error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(errors)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo gói đăng kí</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo gói đăng kí mới.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="name">Tên gói đăng kí</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập tên gói đăng kí"
                {...register("name")}
              />
            </div>

            {errors.name && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.name.message}
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
            {isLoading ? "Đang tạo..." : "Tạo gói đăng kí"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddSubscriptionDialog
