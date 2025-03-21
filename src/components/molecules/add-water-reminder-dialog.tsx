"use client"

import React, { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/atoms/dialog"

import { useAddWaterReminder } from "@/hooks/useWaterReminder"

import {
  CreateUpdateWaterReminderType,
  createUpdateWaterReminderSchema
} from "@/schemas/waterReminderSchema"

import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../atoms/select"

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
    formState: { errors }
  } = useForm<CreateUpdateWaterReminderType>({
    resolver: zodResolver(createUpdateWaterReminderSchema),
    defaultValues: {
      name: "Nhắc nhở uống nước",
      volume: 250,
      isRecurring: true
    }
  })

  const onSubmit = async (data: CreateUpdateWaterReminderType) => {
    setIsLoading(true)

    try {
      const finalData = data
      console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Tạo nhắc nhở thành công!")
      // onClose()
    } catch (error) {
      console.error("Lỗi khi tạo nhắc nhở:", error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(errors)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo nhắc nhở nhắc nhở</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo nhắc nhở nhắc nhở mới.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <div className="space-y-2">
                <Label htmlFor="name">Tên nhắc nhở</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nhắc nhở uống nước"
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
                  placeholder="250"
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
                    <SelectValue placeholder="Tần suất" />
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

          <DialogFooter className="mt-6 gap-4">
            <Button variant="secondary" size="lg" onClick={onClose}>
              Hủy
            </Button>

            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? "Đang tạo..." : "Tạo nhắc nhở"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddWaterReminderDialog
