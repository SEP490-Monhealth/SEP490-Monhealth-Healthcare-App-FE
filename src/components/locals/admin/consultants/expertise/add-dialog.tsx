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
import { Textarea } from "@/components/globals/atoms/textarea"

import { useAddExpertise } from "@/hooks/useExpertise"

import {
  CreateUpdateExpertiseType,
  createUpdateExpertiseSchema
} from "@/schemas/expertiseSchema"

interface AddExpertiseDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddExpertiseDialog({ isOpen, onClose }: AddExpertiseDialogProps) {
  const { mutate: addExpertise } = useAddExpertise()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUpdateExpertiseType>({
    resolver: zodResolver(createUpdateExpertiseSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const onSubmit = async (data: CreateUpdateExpertiseType) => {
    setIsLoading(true)

    try {
      const finalData = data
      console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

      await addExpertise(finalData, {
        onSuccess: () => {
          onClose()
          reset()
        }
      })
    } catch (error) {
      console.error("Lỗi khi tạo chuyên môn:", error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(errors)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo chuyên môn</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo chuyên môn mới.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="name">Tên chuyên môn</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập chuyên môn"
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
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Nhập mô tả chuyên môn"
                {...register("description")}
              />
            </div>

            {errors.description && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.description.message}
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
            {isLoading ? "Đang tạo..." : "Tạo chuyên môn"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddExpertiseDialog
