"use client"

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/globals/atoms/select"

import { useAddWaterReminder } from "@/hooks/useWaterReminder"

import {
  CreateUpdateWaterReminderType,
  createUpdateWaterReminderSchema
} from "@/schemas/waterReminderSchema"

interface AddWaterReminderDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddWaterReminderDialog({
  isOpen,
  onClose
}: AddWaterReminderDialogProps) {
  const { mutate: addWaterReminder } = useAddWaterReminder()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUpdateWaterReminderType>({
    resolver: zodResolver(createUpdateWaterReminderSchema),
    defaultValues: {
      name: "",
      volume: 0,
      isRecurring: false
    }
  })

  const onSubmit = async (data: CreateUpdateWaterReminderType) => {
    setIsLoading(true)

    try {
      const finalData = data
      console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

      await addWaterReminder(finalData, {
        onSuccess: () => {
          onClose()
          reset()
        }
      })
    } catch (error) {
      console.error("Lỗi khi tạo nhắc nhở:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo nhắc nhở</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo nhắc nhở mới.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="name">Tên nhắc nhở</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập tên nhắc nhở"
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
              <Label htmlFor="volume">Dung tích (ml)</Label>
              <Input
                id="volume"
                type="text"
                placeholder="Nhập dung tích"
                {...register("volume", { valueAsNumber: true })}
              />
            </div>
            {errors.volume && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.volume.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="isRecurring">Tần suất</Label>
              <Select
                onValueChange={(value) =>
                  setValue("isRecurring", value === "true")
                }
                defaultValue="false"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn tần suất" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tần suất</SelectLabel>
                    <SelectItem value="false">Không lặp lại</SelectItem>
                    <SelectItem value="true">Lặp lại hàng ngày</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {errors.isRecurring && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.isRecurring.message}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="space-x-4">
          <Button variant="secondary" size="lg" onClick={onClose}>
            Hủy
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? "Đang tạo..." : "Tạo nhắc nhở"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddWaterReminderDialog
