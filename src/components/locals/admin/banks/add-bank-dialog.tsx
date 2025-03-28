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

import { useAddBank } from "@/hooks/useBank"

import {
  CreateUpdateBankType,
  createUpdateBankSchema
} from "@/schemas/bankSchema"

interface AddBankDialogProps {
  isOpen: boolean
  onClose: () => void
}

function AddBankDialog({ isOpen, onClose }: AddBankDialogProps) {
  const { mutate: addBank } = useAddBank()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateUpdateBankType>({
    resolver: zodResolver(createUpdateBankSchema)
  })

  const onSubmit = async (data: CreateUpdateBankType) => {
    setIsLoading(true)

    const finalData = data
    // console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

    try {
      await addBank(finalData, {
        onSuccess: () => {
          onClose()
          reset()
        }
      })
    } catch (error) {
      console.error("Lỗi khi tạo ngân hàng:", error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(errors)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tạo ngân hàng</DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để tạo ngân hàng mới.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="name">Tên ngân hàng</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập tên ngân hàng"
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
              <Label htmlFor="shortName">Tên viết tắt</Label>
              <Input
                id="shortName"
                type="text"
                placeholder="Nhập tên viết tắt ngân hàng"
                {...register("shortName")}
              />
            </div>

            {errors.shortName && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.shortName.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="code">Mã code ngân hàng</Label>
              <Input
                id="code"
                type="text"
                placeholder="Nhập mã code ngân hàng"
                {...register("code")}
              />
            </div>

            {errors.code && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.code.message}
              </p>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Nhập logo URL ngân hàng</Label>
              <Input
                id="logoUrl"
                type="text"
                placeholder="Nhập mã logoUrl ngân hàng"
                {...register("logoUrl")}
              />
            </div>

            {errors.logoUrl && (
              <p className="mt-1 ml-1 text-sm text-red-600">
                {errors.logoUrl.message}
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
            {isLoading ? "Đang tạo..." : "Tạo ngân hàng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddBankDialog
