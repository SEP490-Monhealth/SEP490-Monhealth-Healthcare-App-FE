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

import { useAllergyById, useUpdateAllergy } from "@/hooks/useAllergy"

import {
  CreateUpdateAllergyType,
  createUpdateAllergySchema
} from "@/schemas/allergySchema"

import { formatDate } from "@/utils/formatters"

interface AllergyDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  allergyId: string | null
}

function AllergyDetailDialog({
  isOpen,
  onClose,
  allergyId
}: AllergyDetailDialogProps) {
  const {
    data: allergyData,
    isLoading: isAllergyLoading,
    error: allergyError
  } = useAllergyById(allergyId || "")

  const { mutate: updateAllergy } = useUpdateAllergy()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUpdateAllergyType>({
    resolver: zodResolver(createUpdateAllergySchema)
  })

  useEffect(() => {
    if (allergyData) {
      setValue("name", allergyData.name || "")
      setValue("description", allergyData.description || "")
    }
  }, [allergyData, setValue])

  const onSubmit = async (data: CreateUpdateAllergyType) => {
    setIsEdit(false)
    setIsLoadingSave(true)

    const finalData = data
    // console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

    try {
      await updateAllergy(
        { allergyId: allergyId || "", updatedData: finalData },
        {
          onSuccess: () => {
            setIsEdit(false)
            setIsLoadingSave(false)
          }
        }
      )
    } catch (error) {
      console.error("Lỗi khi cập nhật dị ứng:", error)
      setIsLoadingSave(false)
    }
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
  }

  const isLoading = isAllergyLoading
  const hasError = allergyError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết dị ứng</DialogTitle>
          <DialogDescription>
            Xem thông tin chi tiết của dị ứng.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !allergyData ? (
          <ErrorDialog
            message={allergyError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="allergyId">Mã dị ứng</Label>
              <Input
                disabled
                id="allergyId"
                type="text"
                value={allergyData.allergyId}
              />
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="name">Tên dị ứng</Label>
                {!isEdit ? (
                  <Input
                    id="name"
                    type="text"
                    value={allergyData.name}
                    readOnly
                  />
                ) : (
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập tên dị ứng"
                    defaultValue={allergyData.name}
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

            <div className="col-span-2">
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                {!isEdit ? (
                  <Textarea
                    id="description"
                    rows={4}
                    value={allergyData.description}
                    readOnly
                  />
                ) : (
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Nhập mô tả dị ứng"
                    defaultValue={allergyData.description}
                    {...register("description")}
                  />
                )}
              </div>

              {errors.description && (
                <p className="mt-1 ml-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Ngày tạo</Label>
              <Input
                id="createdAt"
                type="text"
                value={formatDate(allergyData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={allergyData.createdBy || "--"}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(allergyData.updatedAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={allergyData.updatedBy || "--"}
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

export default AllergyDetailDialog
