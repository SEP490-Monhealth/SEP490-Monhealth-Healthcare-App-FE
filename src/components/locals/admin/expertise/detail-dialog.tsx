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

import { useExpertiseById, useUpdateExpertise } from "@/hooks/useExpertise"

import {
  CreateUpdateExpertiseType,
  createUpdateExpertiseSchema
} from "@/schemas/expertiseSchema"

import { formatDate } from "@/utils/formatters"

interface ExpertiseDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  expertiseId: string | null
}

function ExpertiseDetailDialog({
  isOpen,
  onClose,
  expertiseId
}: ExpertiseDetailDialogProps) {
  const {
    data: expertiseData,
    isLoading: isExpertiseLoading,
    error: expertiseError
  } = useExpertiseById(expertiseId || "")

  const { mutate: updateExpertise } = useUpdateExpertise()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUpdateExpertiseType>({
    resolver: zodResolver(createUpdateExpertiseSchema)
  })

  useEffect(() => {
    if (expertiseData) {
      setValue("name", expertiseData.name || "")
      setValue("description", expertiseData.description || "")
    }
  }, [expertiseData, setValue])

  const onSubmit = async (data: CreateUpdateExpertiseType) => {
    setIsEdit(false)
    setIsLoadingSave(true)

    const finalData = data
    console.log("Dữ liệu gửi đi:", JSON.stringify(finalData, null, 2))

    try {
      await updateExpertise(
        { expertiseId: expertiseId || "", updatedData: data },
        {
          onSuccess: () => {
            setIsEdit(false)
            setIsLoadingSave(false)
          }
        }
      )
    } catch (error) {
      console.error("Lỗi khi cập nhật chuyên môn:", error)
      setIsLoadingSave(false)
    }
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancelEdit = () => {
    setIsEdit(false)
  }

  const isLoading = isExpertiseLoading
  const hasError = expertiseError

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chi tiết chuyên môn</DialogTitle>
          <DialogDescription>
            Xem và quản lý thông tin chi tiết của chuyên môn.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingDialog />
        ) : hasError || !expertiseData ? (
          <ErrorDialog
            message={expertiseError?.message || "Không thể tải dữ liệu."}
          />
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label htmlFor="expertiseId">Mã chuyên môn</Label>
              <Input
                id="expertiseId"
                type="text"
                value={expertiseData.expertiseId}
                readOnly
              />
            </div>

            <div>
              <div className="space-y-2">
                <Label htmlFor="name">Tên chuyên môn</Label>

                {!isEdit ? (
                  <Input
                    id="name"
                    type="text"
                    value={expertiseData.name}
                    readOnly
                  />
                ) : (
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập tên chuyên môn"
                    defaultValue={expertiseData.name}
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
                    value={expertiseData.description}
                    readOnly
                  />
                ) : (
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Nhập mô tả chuyên môn"
                    defaultValue={expertiseData.description}
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
                value={formatDate(expertiseData.createdAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdBy">Người tạo</Label>
              <Input
                id="createdBy"
                type="text"
                value={expertiseData.createdBy || "--"}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedAt">Ngày cập nhật</Label>
              <Input
                id="updatedAt"
                type="text"
                value={formatDate(expertiseData.updatedAt)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="updatedBy">Người cập nhật</Label>
              <Input
                id="updatedBy"
                type="text"
                value={expertiseData.updatedBy || "--"}
                readOnly
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <div className="flex w-full justify-between">
            {!isEdit ? (
              <Button variant={"outline"} onClick={handleEdit}>
                Chỉnh sửa
              </Button>
            ) : (
              <div className="space-x-4">
                <Button variant={"outline"} onClick={handleCancelEdit}>
                  Hủy
                </Button>

                <Button
                  type="submit"
                  disabled={isLoadingSave}
                  variant={"default"}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isLoadingSave ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </div>
            )}

            <Button onClick={onClose}>Đóng</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExpertiseDetailDialog
