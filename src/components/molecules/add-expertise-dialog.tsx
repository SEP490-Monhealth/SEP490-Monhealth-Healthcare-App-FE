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

import { useAddExpertise } from "@/hooks/useExpertise"

import {
  CreateUpdateExpertiseType,
  createUpdateExpertiseSchema
} from "@/schemas/expertiseSchema"

import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"

interface AddExpertiseDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddExpertiseDialog({ isOpen, onClose }: AddExpertiseDialogProps) {
  const { mutate: addExpertise } = useAddExpertise()

  const [isActive, setIsActive] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
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

      addExpertise(finalData, {
        onSuccess: () => {
          onClose()
        }
      })
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error)
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

        <div className="space-y-4">
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
              <Input
                id="description"
                type="text"
                placeholder="Nhập mô tả"
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
            {isLoading ? "Đang tạo..." : "Tạo tài khoản"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddExpertiseDialog
