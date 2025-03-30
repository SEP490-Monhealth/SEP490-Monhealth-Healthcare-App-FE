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

import { useAddAllergy } from "@/hooks/useAllergy"

import {
  CreateUpdateAllergyType,
  createUpdateAllergySchema
} from "@/schemas/allergySchema"

interface AddAllergyDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddAllergyDialog({ isOpen, onClose }: AddAllergyDialogProps) {
  const { mutate: addAllergy } = useAddAllergy()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUpdateAllergyType>({
    resolver: zodResolver(createUpdateAllergySchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const onSubmit = async (data: CreateUpdateAllergyType) => {
    setIsLoading(true)

    const finalData = data
    console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

    try {
      await addAllergy(finalData, {
        onSuccess: () => {
          onClose()
          reset()
        }
      })
    } catch (error) {
      console.error("Lỗi khi tạo dị ứng:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo dị ứng</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo dị ứng mới.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="name">Nhập tên dị ứng</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập tên dị ứng"
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
              <Label htmlFor="avatarUrl">Mô tả</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Nhập mô tả dị ứng"
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
            {isLoading ? "Đang tạo..." : "Tạo dị ứng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddAllergyDialog
